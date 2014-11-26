'use strict';

angular
.module('secxbrl')
.config(function ($stateProvider) {

    var checkAccess = function(user, locationQueryParams){
        if(user === undefined || user === null){
            return false;
        }
        //force auth if the token comes as query string
        return !(locationQueryParams && locationQueryParams.token);
    };

    $stateProvider
    .state('home.account', {
        url: '/account',
        abstract: true,
        templateUrl: '/home/account/account.html',
        controller: 'AccountCtrl',
        resolve: {
            user: ['$q', '$location', 'Session', function($q, $location, Session) {
                var deferred = $q.defer();
                var user = Session.getUser();

                if(checkAccess(Session.getUser(), $location.search())){
                    deferred.resolve(user);
                } else {
                    deferred.reject({ status: 401, data: { description: 'Unauthorized access!' } });
                }
                return deferred.promise;
            }],
            isAuthorizedStatisticsUsage: ['Session', '$q', 'API', function(Session, $q, API) {
                var deferred = $q.defer();

                API.Users.isAuthorized({
                    _method: 'POST',
                    right: 'statistics_usage',
                    token: Session.getToken()
                })
                .then(
                    function(data) {
                        deferred.resolve((data && data.success));
                    },
                    function(data) {
                        if(data.status !== 403 && data.status !== 401) {
                            console.error(JSON.stringify(data));
                        }
                        deferred.resolve(false);
                    });
                return deferred.promise;
            }]
        },
        data: {
            title: 'Account'
        }
    });
});