'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var Config = require('./config');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var modRewrite = require('connect-modrewrite');
var rewriteRules = [
  '!\\.html|\\.xml|\\images|\\.js|\\.css|\\.png|\\.jpg|\\.woff|\\.ttf|\\.svg /index.html [L]'
];

gulp.task('server:dist', function() {
  browserSync({
    port: 9000,
    notify: false,
    logPrefix: 'www.secxbrl.info',
    open: false,
    server: {
      baseDir: ['dist'],
      middleware: [
        modRewrite(rewriteRules)
      ]
    }
  });
});

//run the server after having built generated files, and watch for changes
gulp.task('server:dev', function() {
  browserSync({
    port: 9000,
    notify: false,
    logPrefix: 'www.secxbrl.info',
    server: {
      baseDir: ['.', Config.paths.app],
      middleware: [
        modRewrite(rewriteRules)
      ]
    },
    browser: 'default'
  });

  gulp.watch(Config.paths.html, reload);
  gulp.watch(Config.less, ['less', reload]);
  gulp.watch(Config.paths.js, reload);
  gulp.watch(Config.paths.json, ['jsonlint']);
});

gulp.task('server:stop', browserSync.exit);

/* jshint camelcase:false*/
//var webdriverStandalone = require('gulp-protractor').webdriver_standalone;
var webdriverUpdate = require('gulp-protractor').webdriver_update;

var Config = require('./config');

var protractorConfig = require('../tests/e2e/config/protractor-shared-conf.js');

//update webdriver if necessary, this task will be used by e2e task
gulp.task('webdriver:update', webdriverUpdate);

// Run e2e tests using protractor, make sure serve task is running.
gulp.task('test:e2e', ['webdriver:update'], function() {
  var configs = {
    prod: 'tests/e2e/config/protractor-travis-nosaucelabs-conf.js',
    ci: 'tests/e2e/config/protractor-travis-nosaucelabs-conf.js',
    dev: 'tests/e2e/config/protractor-conf.js'
  };

  var configFile = Config.isOnTravis ? configs.prod : configs.dev;

  return gulp.src(protractorConfig.config.specs)
    .pipe($.protractor.protractor({
      configFile: configFile
    }))
    .on('error', function(e) {
      console.error(e);
      browserSync.exit();
    });
});
