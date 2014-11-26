'use strict';

angular
.module('secxbrl')
.directive('register', function($state, API, Session){
    return {
        restrict: 'E',
        templateUrl: '/modules/ui/registration.html',
        replace: true,
        scope: {
            'class': '@',
            'hideAlreadyHaveAnAccount': '@'
        },
        link: function($scope) {

            $scope.loading = false;
            $scope.registerAttempted = false;

            $scope.register = function () {
                $scope.registerAttempted = true;

                $scope.$broadcast('autocomplete:update');
                $scope.registerForm.passwordRepeat.$setValidity('equals', $scope.password === $scope.passwordRepeat);

                if (!$scope.registerForm.$invalid) {
                    $scope.loading = true;
                    API.Users
                        .newUser({ firstname: $scope.firstname, lastname: $scope.lastname, email: $scope.email, password: $scope.password })
                        .then(
                        function () {
                            Session
                                .login($scope.email, $scope.password)
                                .then(function () {
                                    $state.go('home.account.profile', { }, { reload: true });
                                },
                                function (response) {
                                    $scope.loading = false;
                                    $scope.$emit('error', 'Error', response);
                                });
                        },
                        function (response) {
                            if(response.status === 500 && typeof response.body === 'object' && response.body.code === 'exists') {
                                $scope.loading = false;
                                $scope.registerForm.email.$setValidity('inuse', false);
                            } else {
                                $scope.loading = false;
                                $scope.$emit('error', 'Error', response);
                            }
                        });
                }
            };
        }
    };
});