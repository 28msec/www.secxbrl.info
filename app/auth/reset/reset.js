'use strict';

angular.module('secxbrl')
    .controller('ResetCtrl', function($scope, $stateParams, API, $state, Session) {
        $scope.email = $stateParams.email;
        $scope.resetToken = $stateParams.resetToken;
        $scope.loading = false;
        $scope.changeAttempted = false;

        $scope.change = function(){
            $scope.changeAttempted = true;

            $scope.$broadcast('autocomplete:update');
            $scope.changeForm.passwordRepeat.$setValidity('equals', $scope.password === $scope.passwordRepeat);

            if(!$scope.changeForm.$invalid) {
                $scope.loading = true;
                API.Users
                    .setPassword({ email: $scope.email, resetToken: $scope.resetToken, password: $scope.password })
                    .then(function() {
                        Session
                            .login($scope.email, $scope.password)
                            .then(function () {
                                $state.go('home.account.profile', { }, { reload: true });
                                $scope.loading = false;
                            },
                            function (response) {
                                $scope.$emit('error', 'Error', response);
                                $scope.loading = false;
                            });
                    },
                    function(response) {
                        $scope.$emit('error', 'Error', response);
                        $scope.loading = false;
                    });
            }
        };

    });