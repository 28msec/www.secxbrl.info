'use strict';

angular
.module('secxbrl')
.config(function ($stateProvider) {
    $stateProvider
    .state('home.api', {
        url: '/api',
        templateUrl: '/home/api/api.html',
        controller: 'APICtrl'
    });
})
;
