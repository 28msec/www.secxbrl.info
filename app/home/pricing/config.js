'use strict';

angular
.module('secxbrl')
.config(function ($stateProvider) {
    $stateProvider
    .state('home.pricing', {
        url: '/pricing',
        templateUrl: '/home/pricing/pricing.html',
        controller: 'PricingCtrl'
    });
})
;
