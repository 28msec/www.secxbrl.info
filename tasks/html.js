'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var Config = require('./config');

gulp.task('less', function () {
  gulp.src('app/styles/index.less')
    .pipe($.less({
      paths: [ ]
    }))
    .pipe(gulp.dest('app/styles'));
});

gulp.task('html', ['less'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');
    var assets = $.useref.assets({ searchPath: '{' + Config.paths.app + ',' + Config.paths.tmp + '}' });
    return gulp.src(Config.paths.index)
        .pipe(assets)
        .pipe(jsFilter)
        .pipe($.sourcemaps.init())
        .pipe($.uglify())
        .pipe($.sourcemaps.write('maps'))
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});
