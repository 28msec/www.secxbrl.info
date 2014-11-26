'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var Config = require('./config');

gulp.task('images', function () {
    return gulp.src('www/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});