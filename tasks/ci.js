'use strict';

var fs = require('fs');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var _ = require('lodash');

var Config = require('./config');

var file = Config.paths.credentials;
var tplParam = { file: file };

var msgs = {
  notFound: _.template('<%= file %> is not found.')(tplParam),
  alreadyExists: _.template('<%= file %> exists already, do nothing.')(tplParam)
};

var cmds = {
  encrypt: _.template('sh -c "openssl aes-256-cbc -k $TRAVIS_SECRET_KEY -in <%= file %> -out <%= file %>.enc"')(tplParam),
  decrypt: _.template('sh -c "openssl aes-256-cbc -k $TRAVIS_SECRET_KEY -in <%= file %>.enc -out <%= file %> -d"')(tplParam)
};

gulp.task('env-check', function(done){
  if(process.env.TRAVIS_SECRET_KEY === undefined) {
      done('environment variable TRAVIS_SECRET_KEY is not set.');
  }else {
      done();
  }
});

gulp.task('encrypt', ['env-check'], function(){
  if(fs.existsSync(file)) {
    $.runSequence('encrypt-force');
  } else {
    console.error(msgs.notFound);
    process.exit(1);
  }
});

gulp.task('decrypt', ['env-check'], function(){
  if(!fs.existsSync(file)) {
    $.runSequence('decrypt-force');
  } else {
    $.util.log(msgs.alreadyExists);
  }
});

gulp.task('encrypt-force', ['env-check'], $.shell.task(cmds.encrypt));
gulp.task('decrypt-force', ['env-check'], $.shell.task(cmds.decrypt));

gulp.task('load-config', ['decrypt'], function(done){
  var fs = require('fs');
  Config.credentials = JSON.parse(fs.readFileSync(Config.paths.credentials, 'utf-8'));
  done();
});
