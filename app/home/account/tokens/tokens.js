'use strict';

angular.module('secxbrl')
    .controller('TokensCtrl', function($scope, $modal, API) {
        $scope.tokens = [];

        $scope.getData = function() {
            API.Session.tokens({ _method: 'POST', token: $scope.token, $refresh: true })
                .then(
                function(data) {
                    $scope.tokens = [];
                    angular.forEach(data.results, function(token){
                        if(token['token-type'] !== 'ui-login') {
                            $scope.tokens.push(token);
                        }
                    });
                },
                function(response) {
                    $scope.$emit('error', 'Error', response);
                }
            );
        };

        $scope.revoke = function(token) {
            $modal.open( {
                windowClass: 'modal-small',
                templateUrl: 'tokens_revoke.html',
                controller: ['$scope', '$modalInstance', 'token',  function ($scope, $modalInstance, token) {
                    $scope.object = { token: token, password: '' };
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                    $scope.ok = function () {
                        $modalInstance.close({ password: $scope.object.password });
                    };
                }],
                resolve: {
                    token: function() { return token.token; }
                }
            }).result.then(function(item) {
                    API.Session.revoke({ _method: 'POST', email: $scope.user.email, password: item.password, token: token.token, $refresh: true })
                        .then(
                        function() {
                            if (token.token === $scope.token)
                            {
                                $scope.$emit('logout');
                            }
                            else
                            {
                                $scope.getData();
                            }
                        },
                        function(response) {
                            $scope.$emit('error', 'Error', response);
                        }
                    );
                });
        };

        $scope.create = function() {
            $modal.open( {
                windowClass: 'modal-small',
                templateUrl: 'tokens_create.html',
                controller: ['$scope', '$modalInstance',  function ($scope, $modalInstance) {
                    var d = new Date();
                    d.setFullYear(d.getFullYear() + 1);
                    $scope.object = { date: d, password: '', opened: false };
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                    $scope.ok = function () {
                        var d = new Date($scope.object.date);
                        if (Object.prototype.toString.call(d) === '[object Date]' && isFinite(d))
                        {
                            $modalInstance.close({ password: $scope.object.password, expiration: d.toISOString() });
                        }
                        else
                        {
                            $scope.$emit('error', 'Error', 'Invalid date!');
                        }
                    };
                    $scope.open = function($event) {
                        $event.preventDefault();
                        $event.stopPropagation();

                        $scope.object.opened = true;
                    };
                }]
            }).result.then(function(item) {
                    API.Session.token({ _method: 'POST', email: $scope.user.email, password: item.password, expiration: item.expiration, $refresh: true })
                        .then(
                        function() {
                            $scope.getData();
                        },
                        function(response) {
                            $scope.$emit('error', 'Error', response);
                        }
                    );
                });
        };

        $scope.getData();
    });
