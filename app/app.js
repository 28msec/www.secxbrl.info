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
    'ngSanitize',
    'contact-us',
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

.run(function($rootScope, ngProgressLite) {

    $rootScope.$on('$stateChangeStart', function() {
        ngProgressLite.start();
    });

    $rootScope.$on('$stateChangeSuccess', function() {
        ngProgressLite.done();
    });

    $rootScope.$on('$stateChangeError', function() {
        ngProgressLite.done();
    });
})
;
