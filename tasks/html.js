'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sass = require('gulp-ruby-sass');

var Config = require('./config');

gulp.task('sass', function() {
    return gulp.src('./scss/ionic.app.scss')
        .pipe(sass({ loadPath: '.' }))
        .pipe(gulp.dest('./www/css/'))
        .pipe($.minifyCss({
            keepSpecialComments: 0
        }))
        .pipe($.rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./www/css/'));
});

gulp.task('html', ['sass'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');
    var assets = $.useref.assets({searchPath: '{.tmp,www}'});
    return gulp.src('www/*.html')
        .pipe(assets)
        .pipe(jsFilter)
        //.pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});
