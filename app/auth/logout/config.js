'use strict';

angular
.module('secxbrl')
.config(function ($stateProvider) {
    $stateProvider
    .state('auth.logout', {
        url: '/logout',
        templateUrl: '/auth/logout/logout.html',
        controller: 'LogoutCtrl'
    });
})
;
