'use strict';

angular.module('secxbrl', [
    'duScroll',
    'duParallax',
    'angular-data.DS',
    'angular-data.DSCacheFactory',
    'ui.router',
    'ui.bootstrap',
    'ngProgressLite',
    'constants',
    'api',
    'session-model',
    'users-api',
    'billing-api',
    'ngSanitize',
    'angular.directives-round-progress' // round api calls widget on stats page
])

.factory('ConnectionHandler', function($q, $rootScope, DEBUG){
    return {
        'responseError': function(rejection){
            if(rejection.status === 401) {
                if(DEBUG) {
                    console.error('intercepted 401: emitting auth');
                }
                $rootScope.$emit('auth');
            }
            return $q.reject(rejection);
        }
    };
})

.config(function ($urlRouterProvider, $stateProvider, $locationProvider, $httpProvider) {

    //Because angularjs default transformResponse is not based on ContentType
    $httpProvider.defaults.transformResponse = function(response, headers){
        var contentType = headers('Content-Type');
        if(/^application\/(.*\+)?json/.test(contentType)) {
            try {
                return JSON.parse(response);
            } catch(e) {
                console.error('Couldn\'t parse the following response:');
                console.error(response);
                return response;
            }
        } else {
            return response;
        }
    };

    // Allow trailing slash e.g. rewrite /account/ to /account
    // This requires that all urls in the config.js must not end with /
    $urlRouterProvider.rule(function ($injector, $location) {
        var path = $location.url();

        // remove trailing slash
        if (path[path.length - 1] === '/') {
            return path.substring(0, path.length - 1);
        }

        // remove slash before query
        if (path.indexOf('/?') > -1) {
            return path.replace('/?', '?');
        }

        return;
    });

    $httpProvider.interceptors.push('ConnectionHandler');

    $locationProvider.html5Mode(true);
    $stateProvider
    .state('500', {
        templateUrl: '/500.html'
    });
})

.run(function($rootScope, ngProgressLite, $state, $location, $modal, API, Session, DEBUG, $log) {

    $rootScope.$on('$stateChangeStart', function() {
        ngProgressLite.start();
    });

    $rootScope.$on('$stateChangeSuccess', function() {
        ngProgressLite.done();
    });

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        if(DEBUG){
            var desc;
            if (error.status){
                desc = error.status + ' - ' + JSON.stringify(error.data);
            } else {
                desc = error.message;
            }
            var msg = 'StateChangeError: from "' + fromState.name + '" to "' + toState.name + '": ' + desc;
            $log.error(msg);
        }
        if(error.message === 'AuthError') {
            Session.redirectToLoginPage();
        }
        ngProgressLite.done();
    });

    $rootScope.$on('auth', function() {
        Session.logout();
        Session.redirectToLoginPage();
    });

    $rootScope.$on('error', function(event, title, message){
        $modal.open( {
            template: '<div class="modal-header alert-danger"><span ng-bind-html="errorObject.title" id="error-header"></span><a class="close" ng-click="cancel()">&times;</a></div><div class="modal-body" id="error-body"><div ng-repeat="message in errorObject.message" ng-bind-html="message"></div> </div><div class="text-right modal-footer"><button class="btn btn-default" ng-click="cancel()">OK</button></div>',
            controller: ['$scope', '$modalInstance', 'errorObject',  function ($scope, $modalInstance, errorObject) {
                $scope.errorObject = errorObject;
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }],
            resolve: {
                errorObject: function() {
                    var msg = [ message ];
                    if(typeof message === 'object' && message.status && message.body){
                        var status = message.status;
                        var code = message.body.code;
                        var description = message.body.description;
                        var errorMsg = message.body.message;

                        msg = [];
                        if(typeof code === 'string' && typeof description === 'string'){
                            msg.push('' + description);
                            msg.push('Error Code: ' + code);
                        } else if(typeof errorMsg === 'string'){
                            msg.push('' + errorMsg);
                        } else if(status === 403){
                            msg.push('Forbidden (Possible reason: Invalid password)');
                        }
                        msg.push('Status: ' + status);
                    }
                    return { title: title, message: msg };
                }
            }
        });
    });

    $rootScope.$on('alert', function(event, title, message){
        $modal.open( {
            template: '<div class="modal-header"><span ng-bind-html="object.title" id="alert-header"></span><a class="close" ng-click="cancel()">&times;</a></div><div class="modal-body" ng-bind-html="object.message" id="alert-body"></div><div class="text-right modal-footer"><button class="btn btn-default" ng-click="cancel()">OK</button></div>',
            controller: ['$scope', '$modalInstance', 'object',  function ($scope, $modalInstance, object) {
                $scope.object = object;
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }],
            resolve: {
                object: function() { return { title: title, message: message }; }
            }
        });
    });
})
;
