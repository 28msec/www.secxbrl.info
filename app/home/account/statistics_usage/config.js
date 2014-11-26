'use strict';

angular
.module('secxbrl')
.config(function ($stateProvider) {
    $stateProvider
    .state('home.account.statistics_usage', {
        url: '/statistics_usage',
        templateUrl: '/home/account/statistics_usage/statistics_usage.html',
        controller: 'StatisticsUsageCtrl',
        resolve: {
            apiStatistics: ['Session', '$http', 'API_URL', function(Session, $http, API_URL) {
                return $http({
                    method : 'GET',
                    url: API_URL + '/_queries/public/UsageStats.jq',
                    params : {
                        '_method' : 'POST',
                        'token' : Session.getToken()
                    }
                });
            }]
        },
        data: {
            subActive: 'statistics_usage',
            title: 'API Usage'
        }
    });
})
;
