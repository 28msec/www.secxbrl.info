'use strict';

angular
.module('secxbrl')
.config(function ($stateProvider) {
    $stateProvider
    .state('home', {
        url: '',
        abstract: true,
        templateUrl: '/home/home.html',
        controller: 'HomeCtrl'
    });
});