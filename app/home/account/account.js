'use strict';

angular.module('secxbrl')
    .controller('AccountCtrl', function($scope, $state, Session, user, isAuthorizedStatisticsUsage) {
        $scope.user = user;
        $scope.token = Session.getToken();
        $scope.isAuthorizedStatisticsUsage = isAuthorizedStatisticsUsage;

        $scope.$on('$stateChangeSuccess', function(event, toState) {
            $scope.subActive = toState.data && toState.data.subActive;
        });

    });
