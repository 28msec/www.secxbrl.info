/*jshint -W069 */
/*global angular:false */
angular.module('users-api', [])
    .factory('UsersAPI', ['$q', '$http', '$rootScope', function($q, $http, $rootScope) {
        'use strict';

        /**
         * This API can be used to manage users. Note, that the POST method can be simulated by using GET and adding the _method=POST parameter to the HTTP request.
         * @class " || UsersAPI || "
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
             * Retrieve user record by ID or email
             * @method
             * @name UsersAPI#getUser
             * @param {{string}} userid -
             * @param {{string}} email -
             * @param {{string}} token - The token of the current session
             * @param {{}} _method - This API can be used to manage users. Note, that the POST method can be simulated by using GET and adding the _method=POST parameter to the HTTP request.
             *
             */
            this.getUser = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/users/get.jq';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters['userid'] !== undefined) {
                    queryParameters['userid'] = parameters['userid'];
                }

                if (parameters['email'] !== undefined) {
                    queryParameters['email'] = parameters['email'];
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
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
                $http({
                        timeout: parameters.$timeout,
                        method: 'GET',
                        url: url,
                        params: queryParameters,
                        data: body,
                        headers: headers
                    })
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
             * Create new user record
             * @method
             * @name UsersAPI#newUser
             * @param {{string}} firstname -
             * @param {{string}} lastname -
             * @param {{string}} email -
             * @param {{string}} password - Will be removed after notifications are implemented.
             * @param {{}} _method - This API can be used to manage users. Note, that the POST method can be simulated by using GET and adding the _method=POST parameter to the HTTP request.
             *
             */
            this.newUser = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/users/new.jq';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters['firstname'] !== undefined) {
                    queryParameters['firstname'] = parameters['firstname'];
                }

                if (parameters['firstname'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: firstname'));
                    return deferred.promise;
                }

                if (parameters['lastname'] !== undefined) {
                    queryParameters['lastname'] = parameters['lastname'];
                }

                if (parameters['lastname'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: lastname'));
                    return deferred.promise;
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
                $http({
                        timeout: parameters.$timeout,
                        method: 'POST',
                        url: url,
                        params: queryParameters,
                        data: body,
                        headers: headers
                    })
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
             * Edit user record
             * @method
             * @name UsersAPI#editUser
             * @param {{string}} userid -
             * @param {{string}} firstname -
             * @param {{string}} lastname -
             * @param {{string}} newemail -
             * @param {{string}} email - Email of the authorized user (needed if changing the email)
             * @param {{string}} password - Password of the authorized user (needed if changing the email)
             * @param {{string}} token - The token of the current session
             * @param {{}} _method - This API can be used to manage users. Note, that the POST method can be simulated by using GET and adding the _method=POST parameter to the HTTP request.
             *
             */
            this.editUser = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/users/edit.jq';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters['userid'] !== undefined) {
                    queryParameters['userid'] = parameters['userid'];
                }

                if (parameters['userid'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: userid'));
                    return deferred.promise;
                }

                if (parameters['firstname'] !== undefined) {
                    queryParameters['firstname'] = parameters['firstname'];
                }

                if (parameters['firstname'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: firstname'));
                    return deferred.promise;
                }

                if (parameters['lastname'] !== undefined) {
                    queryParameters['lastname'] = parameters['lastname'];
                }

                if (parameters['lastname'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: lastname'));
                    return deferred.promise;
                }

                if (parameters['newemail'] !== undefined) {
                    queryParameters['newemail'] = parameters['newemail'];
                }

                if (parameters['email'] !== undefined) {
                    queryParameters['email'] = parameters['email'];
                }

                if (parameters['password'] !== undefined) {
                    queryParameters['password'] = parameters['password'];
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
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
                $http({
                        timeout: parameters.$timeout,
                        method: 'POST',
                        url: url,
                        params: queryParameters,
                        data: body,
                        headers: headers
                    })
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
             * Change user password
             * @method
             * @name UsersAPI#resetPassword
             * @param {{string}} userid - Id of the user
             * @param {{string}} newpassword - New password
             * @param {{string}} email - Email of the authorized user
             * @param {{string}} password - Password of the authorized user
             * @param {{string}} token - The token of the current session
             * @param {{}} _method - This API can be used to manage users. Note, that the POST method can be simulated by using GET and adding the _method=POST parameter to the HTTP request.
             *
             */
            this.resetPassword = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/users/resetPassword.jq';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters['userid'] !== undefined) {
                    queryParameters['userid'] = parameters['userid'];
                }

                if (parameters['userid'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: userid'));
                    return deferred.promise;
                }

                if (parameters['newpassword'] !== undefined) {
                    queryParameters['newpassword'] = parameters['newpassword'];
                }

                if (parameters['newpassword'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: newpassword'));
                    return deferred.promise;
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
                $http({
                        timeout: parameters.$timeout,
                        method: 'POST',
                        url: url,
                        params: queryParameters,
                        data: body,
                        headers: headers
                    })
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
             * Send the email with the reset password token
             * @method
             * @name UsersAPI#forgotPassword
             * @param {{string}} email -
             *
             */
            this.forgotPassword = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/users/forgotPassword.jq';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters['email'] !== undefined) {
                    queryParameters['email'] = parameters['email'];
                }

                if (parameters['email'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: email'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                var url = domain + path;
                $http({
                        timeout: parameters.$timeout,
                        method: 'POST',
                        url: url,
                        params: queryParameters,
                        data: body,
                        headers: headers
                    })
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
             * Set the password for a user based on email and the reset password token
             * @method
             * @name UsersAPI#setPassword
             * @param {{string}} email - The email of the user to set the password
             * @param {{string}} password - The new password
             * @param {{string}} resetToken - The reset password token
             * @param {{}} _method - This API can be used to manage users. Note, that the POST method can be simulated by using GET and adding the _method=POST parameter to the HTTP request.
             *
             */
            this.setPassword = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/users/setPassword.jq';

                var body;
                var queryParameters = {};
                var headers = {};

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

                if (parameters['resetToken'] !== undefined) {
                    queryParameters['resetToken'] = parameters['resetToken'];
                }

                if (parameters['resetToken'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: resetToken'));
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
                $http({
                        timeout: parameters.$timeout,
                        method: 'POST',
                        url: url,
                        params: queryParameters,
                        data: body,
                        headers: headers
                    })
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
             * Get user picture
             * @method
             * @name UsersAPI#getPicture
             * @param {{string}} userid - User ID to get picture for. Default is current user.
             * @param {{string}} token - The token of the current session
             * @param {{}} _method - This API can be used to manage users. Note, that the POST method can be simulated by using GET and adding the _method=POST parameter to the HTTP request.
             *
             */
            this.getPicture = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/users/getPicture.jq';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters['userid'] !== undefined) {
                    queryParameters['userid'] = parameters['userid'];
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
                $http({
                        timeout: parameters.$timeout,
                        method: 'GET',
                        url: url,
                        params: queryParameters,
                        data: body,
                        headers: headers
                    })
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
             * Upload user picture
             * @method
             * @name UsersAPI#uploadPicture
             * @param {{string}} userid -
             * @param {{file}} image - The image file
             * @param {{string}} token - The token of the current session
             * @param {{}} _method - This API can be used to manage users. Note, that the POST method can be simulated by using GET and adding the _method=POST parameter to the HTTP request.
             *
             */
            this.uploadPicture = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/users/uploadPicture.jq';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters['userid'] !== undefined) {
                    queryParameters['userid'] = parameters['userid'];
                }

                if (parameters['userid'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: userid'));
                    return deferred.promise;
                }

                if (parameters['image'] !== undefined) {
                    queryParameters['image'] = parameters['image'];
                }

                if (parameters['image'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: image'));
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
                $http({
                        timeout: parameters.$timeout,
                        method: 'POST',
                        url: url,
                        params: queryParameters,
                        data: body,
                        headers: headers
                    })
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
             * Remove user picture
             * @method
             * @name UsersAPI#removePicture
             * @param {{string}} userid -
             * @param {{string}} token - The token of the current session
             * @param {{}} _method - This API can be used to manage users. Note, that the POST method can be simulated by using GET and adding the _method=POST parameter to the HTTP request.
             *
             */
            this.removePicture = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/users/removePicture.jq';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters['userid'] !== undefined) {
                    queryParameters['userid'] = parameters['userid'];
                }

                if (parameters['userid'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: userid'));
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
                $http({
                        timeout: parameters.$timeout,
                        method: 'POST',
                        url: url,
                        params: queryParameters,
                        data: body,
                        headers: headers
                    })
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
             * Checks to see if the current logged in user has a particular right
             * @method
             * @name UsersAPI#isAuthorized
             * @param {{string}} right - The right id
             * @param {{string}} token - The token of the current session
             * @param {{}} _method - This API can be used to manage users. Note, that the POST method can be simulated by using GET and adding the _method=POST parameter to the HTTP request.
             *
             */
            this.isAuthorized = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/users/isAuthorized.jq';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters['right'] !== undefined) {
                    queryParameters['right'] = parameters['right'];
                }

                if (parameters['right'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: right'));
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
                $http({
                        timeout: parameters.$timeout,
                        method: 'POST',
                        url: url,
                        params: queryParameters,
                        data: body,
                        headers: headers
                    })
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