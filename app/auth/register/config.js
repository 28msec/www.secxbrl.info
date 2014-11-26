'use strict';

angular
.module('secxbrl')
.config(function ($stateProvider) {
    $stateProvider
    .state('auth.register', {
        url: '/sign-up',
        templateUrl: '/auth/register/register.html',
        controller: 'RegisterCtrl'
    });
})
;
