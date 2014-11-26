'use strict';

var fs = require('fs');

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var bower = require('bower');
var sh = require('shelljs');

var Config = require('./tasks/config');

require('./tasks/lint');
require('./tasks/html');
require('./tasks/images');
require('./tasks/swagger');
require('./tasks/s3');

gulp.task('env-check', function(done){
  if(process.env.TRAVIS_SECRET_KEY === undefined) {
    console.error('environment variable TRAVIS_SECRET_KEY is not set.');
    process.exit(1);
  }
  done();
});

gulp.task('encrypt', ['env-check'], function(){
  if(fs.existsSync('credentials.json')) {
    $.runSequence('encrypt-force');
  } else {
    console.error('credentials.json is not found.');
    process.exit(1);
  }
});

gulp.task('decrypt', ['env-check'], function(){
  if(!fs.existsSync('credentials.json')) {
    $.runSequence('decrypt-force');
  } else {
    $.util.log('credentials.json exists already, do nothing');
  }
});

gulp.task('encrypt-force', ['env-check'], $.shell.task('openssl aes-256-cbc -k $TRAVIS_SECRET_KEY -in credentials.json -out credentials.json.enc'));
gulp.task('decrypt-force', ['env-check'], $.shell.task('openssl aes-256-cbc -k $TRAVIS_SECRET_KEY -in credentials.json.enc -out credentials.json -d'));

gulp.task('load-config', ['decrypt'], function(done){
  var fs = require('fs');
  Config.credentials = JSON.parse(fs.readFileSync(Config.paths.credentials, 'utf-8'));
  done();
});

gulp.task('watch', function() {
  return gulp.watch(Config.paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      $.gutil.log('bower', $.gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + $.gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', $.gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + $.gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('extras', function () {
  return gulp.src(['www/**/*.html', 'www/**/*.ttf', 'www/**/*.woff'], { dot: true })
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
  return gulp.src(['.tmp', 'dist', '.awspublish-secdisclosures-*'], { read: false }).pipe($.clean());
});

gulp.task('build', ['clean'], function(done){
  $.runSequence(['load-config', 'lint', 'swagger', 'html', 'images', 'extras'], done);
});

gulp.task('serve', ['build'], function () {
  var connect = require('connect');
  var serveStatic = require('serve-static');

  var app = connect().use(serveStatic('dist'));

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:9000');
    });
});

gulp.task('default', ['build']);

gulp.task('setup', function(done){
  $.runSequence('build', 's3-setup', done);
});

gulp.task('teardown', ['load-config'], function(){
  return gulp.start('s3-teardown');
});
