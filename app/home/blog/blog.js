'use strict';

angular.module('secxbrl')
    .factory('BlogAPI', function($http, DSCacheFactory){
        var blogCache = DSCacheFactory('BlogCache', {
            maxAge: 24 * 60 * 60 * 1000,
            recycleFreq: 60000,
            verifyIntegrity: true
        });

        return {
            getIndex: function() {
                return $http({
                    method: 'GET',
                    url: '/blog/index.json',
                    cache: blogCache
                });
            }
        };
    })
    .controller('BlogCtrl', function($rootScope, $scope, $stateParams, $location, blogIndex) {

        $scope.wemail = $location.search().wemail;
        $location.search({});
        $scope.index = blogIndex ? blogIndex.data : { entries: [] };

        $scope.hasTag = function(entry, tag) {
            return entry.tags.indexOf(tag) !== -1;
        };

        $scope.getEntriesfrom = function(col) {
            var entries = [];
            var rows = Math.ceil($scope.index.entries.length / $scope.itemsPerCol);
            for(var i = 0; i < rows; i++) {
                var entry = $scope.entries[(i * $scope.itemsPerCol) + col];
                if(entry) {
                    entries.push(entry);
                }
            }
            return entries;
        };

        $scope.formatDate = function(dateStr){
            var date = new Date(dateStr);
            var current = new Date();
            var timeDiff = Math.abs(current.getTime() - date.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            if(diffDays > 365) {
                var years = Math.floor(diffDays / 365);
                return  years + (years > 1 ? ' years' : ' year');
            } else if(diffDays > 30) {
                var months = Math.floor(diffDays / 30);
                return months + (months > 1 ? ' months' : ' month');
            } else {
                return diffDays + (diffDays > 1 ? ' day' : ' days');
            }
        };

    });
