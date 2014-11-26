'use strict';

angular
.module('secxbrl')
.config(function ($stateProvider) {
    $stateProvider
    .state('home.blog.entry', {
        url: '/:id/:slug',
        templateUrl: '/home/blog/entry/entry.html',
        controller: 'EntryCtrl'
    });
})
;
