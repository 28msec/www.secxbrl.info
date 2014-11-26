'use strict';

angular
.module('secxbrl')
.config(function ($stateProvider) {
    $stateProvider
    .state('auth', {
        url: '/auth',
        abstract: true,
        templateUrl: '/auth/auth.html',
        controller: 'AuthCtrl'
    });
})
;
