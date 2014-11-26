'use strict';

angular
.module('secxbrl')
.config(function ($stateProvider) {
    $stateProvider
    .state('home.account.profile', {
        url: '',
        templateUrl: '/home/account/profile/profile.html',
        controller: 'ProfileCtrl',
        data: {
            subActive: 'info',
            title: 'Profile Information'
        }
    });
})
;
