/*jshint -W069 */
/*global angular:false */
angular.module('billing', [])
    .factory('BillingAPI', ['$q', '$http', '$rootScope', function($q, $http, $rootScope) {
        'use strict';

        /**
         *
         * @class " || BillingAPI || "
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
             * Get the billing information using a token.
             * @method
             * @name BillingAPI#getBillingInfo
             * @param {{string}} format - The result format
             * @param {{string}} token - The token
             * @param {{}} _method -
             *
             */
            this.getBillingInfo = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/billing/get-billing-info.jq';

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
             * Sets the billing information using a recurly token.
             * @method
             * @name BillingAPI#setBillingInfo
             * @param {{string}} format - The result format
             * @param {{string}} recurlyToken - The Recurly token
             * @param {{string}} token - The user's token
             * @param {{}} _method -
             *
             */
            this.setBillingInfo = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/billing/set-billing-info.jq';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (parameters['format'] !== undefined) {
                    queryParameters['format'] = parameters['format'];
                }

                if (parameters['recurlyToken'] !== undefined) {
                    queryParameters['recurlyToken'] = parameters['recurlyToken'];
                }

                if (parameters['recurlyToken'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: recurlyToken'));
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
             * Lists the invoices of the user identified by token
             * @method
             * @name BillingAPI#invoices
             * @param {{string}} format - The result format
             * @param {{string}} cursor - The current cursor, used for paging
             * @param {{number}} limit - The limit of invoices to read
             * @param {{string}} token - The user's token
             * @param {{}} _method -
             *
             */
            this.invoices = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/billing/invoices.jq';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (parameters['format'] !== undefined) {
                    queryParameters['format'] = parameters['format'];
                }

                if (parameters['cursor'] !== undefined) {
                    queryParameters['cursor'] = parameters['cursor'];
                }

                if (parameters['limit'] !== undefined) {
                    queryParameters['limit'] = parameters['limit'];
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
             * Get information about an invoice of the user identified by token. If asked in PDF format, the invoice is returned rendered. Otherwise metadata is returned.
             * @method
             * @name BillingAPI#invoice
             * @param {{string}} format - The result format
             * @param {{string}} invoiceNumber - The invoice number from Recurly
             * @param {{string}} token - The user's token
             * @param {{}} _method -
             *
             */
            this.invoice = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/billing/invoice.jq';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (parameters['format'] !== undefined) {
                    queryParameters['format'] = parameters['format'];
                }

                if (parameters['invoiceNumber'] !== undefined) {
                    queryParameters['invoiceNumber'] = parameters['invoiceNumber'];
                }

                if (parameters['invoiceNumber'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: invoiceNumber'));
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
             * Lists the subscriptions of the user identified by token
             * @method
             * @name BillingAPI#subscriptions
             * @param {{string}} format - The result format
             * @param {{string}} token - The user's token
             * @param {{}} _method -
             *
             */
            this.subscriptions = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/billing/subscriptions.jq';

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
             * Create a subscription to a plan
             * @method
             * @name BillingAPI#createSubscription
             * @param {{string}} format - The result format
             * @param {{string}} plan - The plan code
             * @param {{string}} quantity - The quantity (default 1)
             * @param {{string}} coupon - The coupon code
             * @param {{string}} token - The user's token
             * @param {{}} _method -
             *
             */
            this.createSubscription = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/billing/create-subscription.jq';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (parameters['format'] !== undefined) {
                    queryParameters['format'] = parameters['format'];
                }

                if (parameters['plan'] !== undefined) {
                    queryParameters['plan'] = parameters['plan'];
                }

                if (parameters['plan'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: plan'));
                    return deferred.promise;
                }

                if (parameters['quantity'] !== undefined) {
                    queryParameters['quantity'] = parameters['quantity'];
                }

                if (parameters['coupon'] !== undefined) {
                    queryParameters['coupon'] = parameters['coupon'];
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
             * Cancel a subscription identified by recurly id
             * @method
             * @name BillingAPI#cancelSubscription
             * @param {{string}} format - The result format
             * @param {{string}} recurlyId - The subscription id
             * @param {{string}} plan - The plan code
             * @param {{string}} token - The user's token
             * @param {{}} _method -
             *
             */
            this.cancelSubscription = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/billing/cancel-subscription.jq';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (parameters['format'] !== undefined) {
                    queryParameters['format'] = parameters['format'];
                }

                if (parameters['recurlyId'] !== undefined) {
                    queryParameters['recurlyId'] = parameters['recurlyId'];
                }

                if (parameters['recurlyId'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: recurlyId'));
                    return deferred.promise;
                }

                if (parameters['plan'] !== undefined) {
                    queryParameters['plan'] = parameters['plan'];
                }

                if (parameters['plan'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: plan'));
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
             * Get the monthly usage of the user identified by token
             * @method
             * @name BillingAPI#usage
             * @param {{string}} format - The result format
             * @param {{string}} token - The user's token
             * @param {{}} _method -
             *
             */
            this.usage = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/billing/usage.jq';

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