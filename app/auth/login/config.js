'use strict';

angular
.module('secxbrl')
.config(function ($stateProvider) {
    $stateProvider
    .state('auth.login', {
        url: '',
        templateUrl: '/auth/login/login.html',
        controller: 'LoginCtrl'
    });
})
;
