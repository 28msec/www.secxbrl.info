'use strict';

angular.module('secxbrl')
    .controller('RegisterCtrl', function($scope, $stateParams) {
        $scope.returnPage = $stateParams.returnPage;
    });