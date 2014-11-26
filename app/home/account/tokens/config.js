'use strict';

angular
.module('secxbrl')
.config(function ($stateProvider) {
    $stateProvider
    .state('home.account.tokens', {
        url: '/tokens',
        templateUrl: '/home/account/tokens/tokens.html',
        controller: 'TokensCtrl',
        data: {
            subActive: 'tokens',
            title: 'API Tokens'
        }
    });
})
;
