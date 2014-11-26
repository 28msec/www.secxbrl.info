'use strict';

angular
    .module('session-model', ['constants', 'api'])
    .factory('Session', function($state, $location, DSCacheFactory, API, APPNAME){

        return (function() {

            var cache;

            function redirectToLoginPage(optionalReturnPage){
                var p = optionalReturnPage;
                if(p === undefined){
                    p = $location.url();
                }
                if (p.substring(0, 5) === '/auth')
                {
                    p = p.substring(5);
                }
                $state.go('auth.login', { returnPage: p }, { reload: true });
            }

            function getCache(){
                if(cache === undefined){
                    cache = DSCacheFactory.get(APPNAME);
                }
                if(cache === undefined){
                    // default settings
                    cache = DSCacheFactory(APPNAME, {
                        maxAge: null, // no max age
                        recycleFreq: 60 * 1000,
                        deleteOnExpire: 'aggressive',
                        storageMode: 'localStorage'
                    });
                }
                return cache;
            }

            function getToken(){
                var token = getCache().get('token');
                if(token === undefined){
                    throw new Error('AuthError');
                }
                return token;
            }

            function setToken(ltoken){
                getCache().put('token', ltoken);
            }

            function getUser(force){
                var user = getCache().get('user');
                if(user === undefined && force){
                    throw new Error('AuthError');
                }
                return user;
            }

            function setUser(id, email, firstname, lastname){
                var luser = { id: id, email: email, firstname: firstname, lastname: lastname };
                getCache().put('user', luser);
            }

            function login(email, password) {
                return API.Session.login({ 'email': email, 'password': password })
                .then(function(data) {
                    setToken(data.token);
                    setUser(data._id, email, data.firstname, data.lastname);
                });
            }

            function logout() {
                getCache().remove('token');
                getCache().remove('user');
            }

            return {
                redirectToLoginPage: redirectToLoginPage,
                login: login,
                logout: logout,
                getUser: getUser,
                setUser: setUser,
                getToken: getToken
            };
        })();
    });
