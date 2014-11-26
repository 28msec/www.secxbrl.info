'use strict';

angular
.module('secxbrl')
.config(function ($stateProvider) {
    $stateProvider
    .state('home.blog.entries', {
        url: '',
        templateUrl: '/home/blog/entries/entries.html',
        controller: 'EntriesCtrl'
    });
})
;
