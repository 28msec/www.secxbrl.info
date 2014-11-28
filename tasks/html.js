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
    var assets = $.useref.assets({ searchPath: '{' + Config.paths.app + ',' + Config.paths.tmp + '}' });
    return gulp.src(Config.paths.index)
        .pipe(assets)
        //.pipe($.sourcemaps.init())
        .pipe($.if('**/scripts.js', $.ngAnnotate()))
        .pipe($.if('**/scripts.js', $.uglify()))
        .pipe($.if(Config.paths.css, $.csso()))
        //.pipe($.if(['**/*main.js', '**/*main.css'], $.header(config.banner, { pkg: pkg })))
        .pipe($.rev())
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe($.if('*.html', $.minifyHtml({
            empty: true
        })))
        //.pipe($.sourcemaps.write())
        .pipe(gulp.dest(Config.paths.dist))
        .pipe($.size({
            title: 'html'
        }));
});
