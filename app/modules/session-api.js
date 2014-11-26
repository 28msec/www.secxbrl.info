/*jshint -W069 */
/*global angular:false */
angular.module('session', [])
    .factory('SessionAPI', ['$q', '$http', '$rootScope', function($q, $http, $rootScope) {
        'use strict';

        /**
         * <p>This API can be used to authorize requests.</p><p>Exposes endpoints used for logging in with an email address and a password in order to retrieve a token that can be used for authorizing future request, creating or revoking a token having a custom expiration that can be used in consumer applications, destroying a session identified by a token, and listing the active tokens.</p><p>Also note, that the POST method can be simulated by using GET and adding the _method=POST parameter to the HTTP request.</p><p>Please keep in mind that URLs are case sensitive. That is, all parameters need to be provided as shown in the documentation.</p>
         * @class " || SessionAPI || "
         * @param {string} domain - The project domain
         * @param {string} cache - An angularjs cache implementation
         */
        return function(domain, cache) {

            if (typeof(domain) !== 'string') {
                throw new Error('Domain parameter must be specified as a string.');
            }

            this.$on = function($scope, path, handler) {
                var url = domain + path;
                $scope.$on(url, function() {
                    handler();
                });
                return this;
            };

            this.$broadcast = function(path) {
                var url = domain + path;
                //cache.remove(url);
                $rootScope.$broadcast(url);
                return this;
            };

            /**
             * Login with email and password in order to retrieve a token.
             * @method
             * @name SessionAPI#login
             * @param {{string}} format - The result format
             * @param {{string}} email - Email of user to login
             * @param {{string}} password - Password of user to login
             * @param {{}} _method - <p>This API can be used to authorize requests.</p><p>Exposes endpoints used for logging in with an email address and a password in order to retrieve a token that can be used for authorizing future request, creating or revoking a token having a custom expiration that can be used in consumer applications, destroying a session identified by a token, and listing the active tokens.</p><p>Also note, that the POST method can be simulated by using GET and adding the _method=POST parameter to the HTTP request.</p><p>Please keep in mind that URLs are case sensitive. That is, all parameters need to be provided as shown in the documentation.</p>
             *
             */
            this.login = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/session/login.jq';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (parameters['format'] !== undefined) {
                    queryParameters['format'] = parameters['format'];
                }

                if (parameters['email'] !== undefined) {
                    queryParameters['email'] = parameters['email'];
                }

                if (parameters['email'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: email'));
                    return deferred.promise;
                }

                if (parameters['password'] !== undefined) {
                    queryParameters['password'] = parameters['password'];
                }

                if (parameters['password'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: password'));
                    return deferred.promise;
                }

                if (parameters['_method'] !== undefined) {
                    queryParameters['_method'] = parameters['_method'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                var url = domain + path;
                var options = {
                    timeout: parameters.$timeout,
                    method: 'POST',
                    url: url,
                    params: queryParameters,
                    data: body,
                    headers: headers
                };
                if (Object.keys(form).length > 0) {
                    options.data = form;
                    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    options.transformRequest = function(obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                }
                $http(options)
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject({
                            status: status,
                            headers: headers,
                            config: config,
                            body: data
                        });
                    });

                return deferred.promise;
            };
            /**
             * Logout the user identified by the given API key.
             * @method
             * @name SessionAPI#logout
             * @param {{string}} format - The result format
             * @param {{string}} token - API token of the current user
             * @param {{}} _method - <p>This API can be used to authorize requests.</p><p>Exposes endpoints used for logging in with an email address and a password in order to retrieve a token that can be used for authorizing future request, creating or revoking a token having a custom expiration that can be used in consumer applications, destroying a session identified by a token, and listing the active tokens.</p><p>Also note, that the POST method can be simulated by using GET and adding the _method=POST parameter to the HTTP request.</p><p>Please keep in mind that URLs are case sensitive. That is, all parameters need to be provided as shown in the documentation.</p>
             *
             */
            this.logout = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/session/logout.jq';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (parameters['format'] !== undefined) {
                    queryParameters['format'] = parameters['format'];
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                if (parameters['token'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                if (parameters['_method'] !== undefined) {
                    queryParameters['_method'] = parameters['_method'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                var url = domain + path;
                var options = {
                    timeout: parameters.$timeout,
                    method: 'POST',
                    url: url,
                    params: queryParameters,
                    data: body,
                    headers: headers
                };
                if (Object.keys(form).length > 0) {
                    options.data = form;
                    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    options.transformRequest = function(obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                }
                $http(options)
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject({
                            status: status,
                            headers: headers,
                            config: config,
                            body: data
                        });
                    });

                return deferred.promise;
            };
            /**
             * Create a token having a custom expiration duration.
             * @method
             * @name SessionAPI#token
             * @param {{string}} format - The result format
             * @param {{string}} email - Email of user that creates the token
             * @param {{string}} password - Password of user that creates the token
             * @param {{string}} expiration - Expiration of the token, in ISO format (e.g.: 2014-04-29T14:32:05.0321Z)
             * @param {{}} _method - <p>This API can be used to authorize requests.</p><p>Exposes endpoints used for logging in with an email address and a password in order to retrieve a token that can be used for authorizing future request, creating or revoking a token having a custom expiration that can be used in consumer applications, destroying a session identified by a token, and listing the active tokens.</p><p>Also note, that the POST method can be simulated by using GET and adding the _method=POST parameter to the HTTP request.</p><p>Please keep in mind that URLs are case sensitive. That is, all parameters need to be provided as shown in the documentation.</p>
             *
             */
            this.token = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/session/token.jq';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (parameters['format'] !== undefined) {
                    queryParameters['format'] = parameters['format'];
                }

                if (parameters['email'] !== undefined) {
                    queryParameters['email'] = parameters['email'];
                }

                if (parameters['email'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: email'));
                    return deferred.promise;
                }

                if (parameters['password'] !== undefined) {
                    queryParameters['password'] = parameters['password'];
                }

                if (parameters['password'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: password'));
                    return deferred.promise;
                }

                if (parameters['expiration'] !== undefined) {
                    queryParameters['expiration'] = parameters['expiration'];
                }

                if (parameters['expiration'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: expiration'));
                    return deferred.promise;
                }

                if (parameters['_method'] !== undefined) {
                    queryParameters['_method'] = parameters['_method'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                var url = domain + path;
                var options = {
                    timeout: parameters.$timeout,
                    method: 'POST',
                    url: url,
                    params: queryParameters,
                    data: body,
                    headers: headers
                };
                if (Object.keys(form).length > 0) {
                    options.data = form;
                    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    options.transformRequest = function(obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                }
                $http(options)
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject({
                            status: status,
                            headers: headers,
                            config: config,
                            body: data
                        });
                    });

                return deferred.promise;
            };
            /**
             * Revoke a token having a custom expiration duration.
             * @method
             * @name SessionAPI#revoke
             * @param {{string}} format - The result format
             * @param {{string}} email - Email of user that owns the token
             * @param {{string}} password - Password of user that owns the token
             * @param {{string}} token - API token to revoke
             * @param {{}} _method - <p>This API can be used to authorize requests.</p><p>Exposes endpoints used for logging in with an email address and a password in order to retrieve a token that can be used for authorizing future request, creating or revoking a token having a custom expiration that can be used in consumer applications, destroying a session identified by a token, and listing the active tokens.</p><p>Also note, that the POST method can be simulated by using GET and adding the _method=POST parameter to the HTTP request.</p><p>Please keep in mind that URLs are case sensitive. That is, all parameters need to be provided as shown in the documentation.</p>
             *
             */
            this.revoke = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/session/revoke.jq';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (parameters['format'] !== undefined) {
                    queryParameters['format'] = parameters['format'];
                }

                if (parameters['email'] !== undefined) {
                    queryParameters['email'] = parameters['email'];
                }

                if (parameters['email'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: email'));
                    return deferred.promise;
                }

                if (parameters['password'] !== undefined) {
                    queryParameters['password'] = parameters['password'];
                }

                if (parameters['password'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: password'));
                    return deferred.promise;
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                if (parameters['token'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                if (parameters['_method'] !== undefined) {
                    queryParameters['_method'] = parameters['_method'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                var url = domain + path;
                var options = {
                    timeout: parameters.$timeout,
                    method: 'POST',
                    url: url,
                    params: queryParameters,
                    data: body,
                    headers: headers
                };
                if (Object.keys(form).length > 0) {
                    options.data = form;
                    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    options.transformRequest = function(obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                }
                $http(options)
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject({
                            status: status,
                            headers: headers,
                            config: config,
                            body: data
                        });
                    });

                return deferred.promise;
            };
            /**
             * List tokens of a user identified by its token.
             * @method
             * @name SessionAPI#tokens
             * @param {{string}} format - The result format
             * @param {{string}} token - A valid API token
             * @param {{}} _method - <p>This API can be used to authorize requests.</p><p>Exposes endpoints used for logging in with an email address and a password in order to retrieve a token that can be used for authorizing future request, creating or revoking a token having a custom expiration that can be used in consumer applications, destroying a session identified by a token, and listing the active tokens.</p><p>Also note, that the POST method can be simulated by using GET and adding the _method=POST parameter to the HTTP request.</p><p>Please keep in mind that URLs are case sensitive. That is, all parameters need to be provided as shown in the documentation.</p>
             *
             */
            this.tokens = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/session/tokens.jq';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (parameters['format'] !== undefined) {
                    queryParameters['format'] = parameters['format'];
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                if (parameters['token'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                if (parameters['_method'] !== undefined) {
                    queryParameters['_method'] = parameters['_method'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                if (cached !== undefined && parameters.$refresh !== true) {
                    deferred.resolve(cached);
                    return deferred.promise;
                }
                var options = {
                    timeout: parameters.$timeout,
                    method: 'GET',
                    url: url,
                    params: queryParameters,
                    data: body,
                    headers: headers
                };
                if (Object.keys(form).length > 0) {
                    options.data = form;
                    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    options.transformRequest = function(obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                }
                $http(options)
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject({
                            status: status,
                            headers: headers,
                            config: config,
                            body: data
                        });
                    });

                return deferred.promise;
            };
        };
    }]);