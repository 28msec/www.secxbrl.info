'use strict';

angular.module('secxbrl')
.controller('APICtrl', function($scope, $http, $location, API, API_URL) {
    $scope.content = '';
    $scope.API_URL = (API_URL.indexOf('//') === 0 ? $location.protocol() + ':' + API_URL : API_URL);
    $scope.getdata = function(name) {
        $scope.name = name;
        $http({
            method : 'GET',
            url: '/swagger/' + name + '.json',
            cache : false
        })
            .success(function(data) {
                $scope.content = data;
            });
    };

    $scope.needsAuth = function() {
        return true;
    };

    $scope.getdata('queries');
});
