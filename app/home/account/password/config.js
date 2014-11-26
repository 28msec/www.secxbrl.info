'use strict';

angular
.module('secxbrl')
.config(function ($stateProvider) {
    $stateProvider
    .state('home.account.password', {
        url: '/password',
        templateUrl: '/home/account/password/password.html',
        controller: 'PasswordCtrl',
        data: {
            subActive: 'password',
            title: 'Change Password'
        }
    });
})
;
