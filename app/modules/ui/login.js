'use strict';

angular
.module('secxbrl')
.directive('login', function($state, API, Session, $location){
    return {
        restrict: 'E',
        templateUrl: '/modules/ui/login.html',
        replace: true,
        scope: {
            'class': '@',
            'returnPage': '='
        },
        link: function($scope) {

            $scope.loginAttempted = false;
            $scope.forgotAttempted = false;
            $scope.loading = false;

            $scope.login = function(){
                $scope.loginAttempted = true;
                $scope.forgotAttempted = false;

                $scope.$broadcast('autocomplete:update');
                $scope.loginForm.loginPassword.$setValidity('unauthorized', true);
                if(!$scope.loginForm.$invalid) {
                    $scope.loading = true;
                    Session
                        .login($scope.loginEmail, $scope.loginPassword)
                        .then(function() {
                            if($scope.returnPage){
                                $location.url(decodeURIComponent($scope.returnPage || '/')).replace();
                            } else {
                                // by default go to account page
                                $state.go('home.account.profile', { }, { reload: true });
                            }
                        }, function() {
                            $scope.loading = false;
                            $scope.loginForm.loginPassword.$setValidity('unauthorized', false);
                        });
                }
            };

            $scope.forgot = function(){
                $scope.loginAttempted = false;
                $scope.forgotAttempted = true;

                $scope.$broadcast('autocomplete:update');
                if(!$scope.forgotForm.$invalid) {
                    $scope.loading = true;
                    API.Users
                        .forgotPassword({ email: $scope.forgotEmail })
                        .then(function() {
                            $scope.loading = false;
                            $scope.$emit('alert', 'Help on the way!', 'Please check your email, if you are registered on or system we sent you a link that allows you to change your password.<br><br>The link is valid for 24 hours.');
                            $scope.showForgot = false;
                        },
                        function(response) {
                            $scope.loading = false;
                            $scope.$emit('error', 'Error', response);
                        });
                }
            };
        }
    };
});