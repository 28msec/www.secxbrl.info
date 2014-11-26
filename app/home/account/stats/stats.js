'use strict';

angular.module('secxbrl')
.controller('StatsCtrl', function($scope, $modal, API, apiStatistics) {
    $scope.calls = {
        label: apiStatistics.calls,
        percentage: (apiStatistics.calls / 1000),
        from: new Date(apiStatistics.fromDate),
        to: new Date(apiStatistics.toDate) - 1
    };

});
