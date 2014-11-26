'use strict';

angular.module('secxbrl')
    .controller('EntriesCtrl', function($rootScope, $scope) {

        $scope.cols = [0, 1, 2];
        $scope.itemsPerCol = $scope.cols.length;
        $scope.tagFilter = 'secxbrl';

        var load = function(){
            var entries = [];
            $scope.index.entries.forEach(function(entry){
                if(entry.tags.indexOf($scope.tagFilter) !== -1) {
                    entries.push(entry);
                }
            });
            $scope.entries = entries;
        };

        load();
    });
