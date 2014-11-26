'use strict';

angular
.module('secxbrl')
.config(function ($stateProvider) {
    $stateProvider
    .state('auth.reset', {
        url: '/reset?email&resetToken',
        templateUrl: '/auth/reset/reset.html',
        controller: 'ResetCtrl'
    });
})
;
