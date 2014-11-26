'use strict';

angular
.module('secxbrl')
.config(function ($stateProvider) {
    $stateProvider
    .state('home.start', {
        url: '/',
        templateUrl: '/home/start/start.html',
        controller: 'StartCtrl'
    });
})
;
