'use strict';

angular.module('secxbrl')
    .controller('StatisticsUsageCtrl', function($scope, apiStatistics) {
        $scope.data = apiStatistics.data;

        if ($scope.data.toDate)
        {
            $scope.data.toDate = new Date($scope.data.toDate) - 1;
        }

        $scope.table = { 'cols': [
            { id: 'query', label: 'Query', type: 'string' },
            { id: 'calls', label: 'Calls', type: 'number' }
        ], 'rows': []
        };

        apiStatistics.data.queryStatistics.forEach(function(item) {
            $scope.table.rows.push({ c: [ { v: item.query.replace('/v1/_queries/public/', '') }, { v: item.calls } ] });
        });

        $scope.chart = {
            type: 'PieChart',
            options: {
                legend: { position: 'right', alignment: 'center' },
                width: '100%',
                height: 400,
                chartArea: { left: 15, top: 15, width: '90%', height: '90%' }
            },
            data: $scope.table
        };
    });
