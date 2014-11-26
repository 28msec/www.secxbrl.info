'use strict';

angular
.module('secxbrl')
.config(function ($stateProvider) {
    $stateProvider
    .state('home.account.stats', {
        url: '/stats',
        templateUrl: '/home/account/stats/stats.html',
        controller: 'StatsCtrl',
        resolve: {
            apiStatistics: ['Session', 'API', function(Session, API) {
                return API.Billing.usage({
                    _method : 'POST',
                    token : Session.getToken(),
                    $refresh : true
                });
            }]
        },
        data: {
            subActive: 'stats',
            title: 'Statistics'
        }
    });
})
;
