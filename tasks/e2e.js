'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

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
      throw e;
    });
});
