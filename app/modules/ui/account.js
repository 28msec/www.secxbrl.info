'use strict';

angular
.module('secxbrl')
.directive('account', function(Session){
    return {
        restrict: 'E',
        templateUrl: '/modules/ui/account.html',
        replace: true,
        link: function($scope){
            $scope.init = function(){
                $scope.user = Session.getUser();
                if($scope.user){
                    $scope.name = $scope.user.firstname + ' ' + $scope.user.lastname;
                }
            };
            $scope.doLogout = function(){
                Session.logout();
                Session.redirectToLoginPage('/');
            };

            $scope.init();
        }
    };
});