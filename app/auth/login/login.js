'use strict';

angular.module('secxbrl')
.controller('LoginCtrl', function($scope, $stateParams) {
    $scope.returnPage = $stateParams.returnPage;
});