'use strict';

angular.module('secxbrl')
    .controller('PasswordCtrl', function($scope, $state, API) {
        $scope.attempted = false;
        $scope.change = function() {
            $scope.attempted = true;

            $scope.$broadcast('autocomplete:update');
            $scope.resetForm.password.$setValidity('equals', true);
            $scope.resetForm.passwordRepeat.$setValidity('equals', $scope.passwordNew === $scope.passwordRepeat);

            if(!$scope.resetForm.$invalid) {
                $scope.loading = true;
                API.Users.resetPassword({ userid: $scope.user.id, newpassword: $scope.passwordNew, email: $scope.user.email, password: $scope.password, token: $scope.token, $refresh: true })
                    .then(
                    function() {
                        $scope.$emit('alert', 'Success', 'Your password has been changed.');
                        $scope.reset();
                        $scope.loading = false;
                    },
                    function(response) {
                        if (response.status === 403)
                        {
                            $scope.resetForm.password.$setValidity('equals', false);
                        } else {
                            $scope.$emit('error', 'Error', response);
                        }
                        $scope.loading = false;
                    });
            }
        };

        $scope.reset = function() {
            $scope.password = '';
            $scope.passwordNew = '';
            $scope.passwordRepeat = '';
            $scope.attempted = false;
        };
    });
