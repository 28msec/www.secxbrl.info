/*jshint -W069 */
/*global angular:false */
angular.module('queries', [])
    .factory('QueriesAPI', ['$q', '$http', '$rootScope', function($q, $http, $rootScope) {
        'use strict';

        /**
         * <p>This API allows its users to retrieve financial information provided to the US Securities and Exchange Commission (SEC) by public companies using the XBRL global standard technical syntax. Submitted XBRL information is read by the system, converted to a format which is optimized for query (as opposed to XBRL which is optimized for information exchange), and stored in a database in that queriable format. Additional metadata is added to the system which is commonly used when querying this financial information. Please note that only financial information provided within SEC forms 10-Q and 10-K is provided via this system.</p> <p>Information can be retrieved about entities, the submissions made by those entities, the components contained within those submissions, the model structure of a component, or the facts reported within a component.  All information is provided in the following formats:  JSON (the default), XML, CSV, and Excel.</p> <p>For more information about using this system, you can download this Excel spreadsheet which contains working examples.  Also, this getting started guide is helpful in understanding the information provided by this system.</p> <p>Please note that information outside of the DOW30 can only be accessed using a valid token that can be retrieved by creating an account on http://www.secxbrl.info and login is done using the Session API.</p> <p>Also note, that the POST method can be simulated by using GET and adding the _method=POST parameter to the HTTP request.</p><p>Please keep in mind that URLs are case sensitive. That is, all parameters need to be provided as shown in the documentation.</p>
         * @class " || QueriesAPI || "
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
             * [SEC profile] Retrieve information about all or a selection of entities
             * @method
             * @name QueriesAPI#listEntities
             * @param {{string}} format - The result format
             * @param {{string}} tag - A tag to filter
             * @param {{string}} cik - A CIK number
             * @param {{string}} sic - The industry group
             * @param {{string}} ticker - A ticker symbols
             * @param {{string}} token - The token of the current session (if accessing entities beyond DOW30)
             * @param {{}} _method - <p>This API allows its users to retrieve financial information provided to the US Securities and Exchange Commission (SEC) by public companies using the XBRL global standard technical syntax. Submitted XBRL information is read by the system, converted to a format which is optimized for query (as opposed to XBRL which is optimized for information exchange), and stored in a database in that queriable format. Additional metadata is added to the system which is commonly used when querying this financial information. Please note that only financial information provided within SEC forms 10-Q and 10-K is provided via this system.</p> <p>Information can be retrieved about entities, the submissions made by those entities, the components contained within those submissions, the model structure of a component, or the facts reported within a component.  All information is provided in the following formats:  JSON (the default), XML, CSV, and Excel.</p> <p>For more information about using this system, you can download this Excel spreadsheet which contains working examples.  Also, this getting started guide is helpful in understanding the information provided by this system.</p> <p>Please note that information outside of the DOW30 can only be accessed using a valid token that can be retrieved by creating an account on http://www.secxbrl.info and login is done using the Session API.</p> <p>Also note, that the POST method can be simulated by using GET and adding the _method=POST parameter to the HTTP request.</p><p>Please keep in mind that URLs are case sensitive. That is, all parameters need to be provided as shown in the documentation.</p>
             *
             */
            this.listEntities = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/entities.jq';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (parameters['format'] !== undefined) {
                    queryParameters['format'] = parameters['format'];
                }

                if (parameters['tag'] !== undefined) {
                    queryParameters['tag'] = parameters['tag'];
                }

                if (parameters['cik'] !== undefined) {
                    queryParameters['cik'] = parameters['cik'];
                }

                if (parameters['sic'] !== undefined) {
                    queryParameters['sic'] = parameters['sic'];
                }

                if (parameters['ticker'] !== undefined) {
                    queryParameters['ticker'] = parameters['ticker'];
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
             * [SEC profile] Retrieve the filings of a particular entity
             * @method
             * @name QueriesAPI#listFilings
             * @param {{string}} format - The result format
             * @param {{string}} tag - A tag to filter
             * @param {{string}} cik - A CIK number
             * @param {{string}} ticker - A ticker symbols
             * @param {{string}} sic - The industry group
             * @param {{string}} aid - The id of the filing
             * @param {{string}} fiscalYear - The fiscal year focus of the filings to retrieve (default: LATEST)
             * @param {{string}} fiscalPeriod - The fiscal period focus of the filings to retrieve (default: FY)
             * @param {{string}} token - The token of the current session (if accessing entities beyond DOW30)
             * @param {{}} _method - <p>This API allows its users to retrieve financial information provided to the US Securities and Exchange Commission (SEC) by public companies using the XBRL global standard technical syntax. Submitted XBRL information is read by the system, converted to a format which is optimized for query (as opposed to XBRL which is optimized for information exchange), and stored in a database in that queriable format. Additional metadata is added to the system which is commonly used when querying this financial information. Please note that only financial information provided within SEC forms 10-Q and 10-K is provided via this system.</p> <p>Information can be retrieved about entities, the submissions made by those entities, the components contained within those submissions, the model structure of a component, or the facts reported within a component.  All information is provided in the following formats:  JSON (the default), XML, CSV, and Excel.</p> <p>For more information about using this system, you can download this Excel spreadsheet which contains working examples.  Also, this getting started guide is helpful in understanding the information provided by this system.</p> <p>Please note that information outside of the DOW30 can only be accessed using a valid token that can be retrieved by creating an account on http://www.secxbrl.info and login is done using the Session API.</p> <p>Also note, that the POST method can be simulated by using GET and adding the _method=POST parameter to the HTTP request.</p><p>Please keep in mind that URLs are case sensitive. That is, all parameters need to be provided as shown in the documentation.</p>
             *
             */
            this.listFilings = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/filings.jq';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (parameters['format'] !== undefined) {
                    queryParameters['format'] = parameters['format'];
                }

                if (parameters['tag'] !== undefined) {
                    queryParameters['tag'] = parameters['tag'];
                }

                if (parameters['cik'] !== undefined) {
                    queryParameters['cik'] = parameters['cik'];
                }

                if (parameters['ticker'] !== undefined) {
                    queryParameters['ticker'] = parameters['ticker'];
                }

                if (parameters['sic'] !== undefined) {
                    queryParameters['sic'] = parameters['sic'];
                }

                if (parameters['aid'] !== undefined) {
                    queryParameters['aid'] = parameters['aid'];
                }

                if (parameters['fiscalYear'] !== undefined) {
                    queryParameters['fiscalYear'] = parameters['fiscalYear'];
                }

                if (parameters['fiscalPeriod'] !== undefined) {
                    queryParameters['fiscalPeriod'] = parameters['fiscalPeriod'];
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
             * Retrieve a summary for all components of a given filing
             * @method
             * @name QueriesAPI#listComponents
             * @param {{string}} format - The result format
             * @param {{string}} ticker - [SEC profile] The ticker of the entity
             * @param {{string}} tag - [SEC profile] The tag to filter entities
             * @param {{string}} sic - [SEC profile] The industry group
             * @param {{string}} cik - [SEC profile] The CIK of an entity. This parameter needs to be used together with the fiscalYear, fiscalPeriod, and disclosure parameters to identify a component.
             * @param {{string}} fiscalYear - [SEC profile] The fiscal year focus of the components to retrieve (default: ALL)
             * @param {{string}} fiscalPeriod - [SEC profile] The fiscal period focus of the components to retrieve (default: ALL)
             * @param {{string}} aid - The id of the filings for which to retrieve components
             * @param {{string}} cid - [Deprecated] The id of a particular component
             * @param {{string}} networkIdentifier - [SEC profile] The network identifier (=role) of a particular component
             * @param {{string}} role - The role of a particular component
             * @param {{string}} disclosure - [SEC profile] The disclosure to search for (e.g. BalanceSheet)
             * @param {{string}} reportElement - The name of the report element to search for (e.g. us-gaap:Goodwill)
             * @param {{string}} label - A search term to search in the labels of components (e.g. stock)
             * @param {{string}} profileName - Specifies which profile to use. The default depends on the underlying repository.
             * @param {{string}} token - The token of the current session (if accessing entities beyond DOW30)
             * @param {{}} _method - <p>This API allows its users to retrieve financial information provided to the US Securities and Exchange Commission (SEC) by public companies using the XBRL global standard technical syntax. Submitted XBRL information is read by the system, converted to a format which is optimized for query (as opposed to XBRL which is optimized for information exchange), and stored in a database in that queriable format. Additional metadata is added to the system which is commonly used when querying this financial information. Please note that only financial information provided within SEC forms 10-Q and 10-K is provided via this system.</p> <p>Information can be retrieved about entities, the submissions made by those entities, the components contained within those submissions, the model structure of a component, or the facts reported within a component.  All information is provided in the following formats:  JSON (the default), XML, CSV, and Excel.</p> <p>For more information about using this system, you can download this Excel spreadsheet which contains working examples.  Also, this getting started guide is helpful in understanding the information provided by this system.</p> <p>Please note that information outside of the DOW30 can only be accessed using a valid token that can be retrieved by creating an account on http://www.secxbrl.info and login is done using the Session API.</p> <p>Also note, that the POST method can be simulated by using GET and adding the _method=POST parameter to the HTTP request.</p><p>Please keep in mind that URLs are case sensitive. That is, all parameters need to be provided as shown in the documentation.</p>
             *
             */
            this.listComponents = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/components.jq';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (parameters['format'] !== undefined) {
                    queryParameters['format'] = parameters['format'];
                }

                if (parameters['ticker'] !== undefined) {
                    queryParameters['ticker'] = parameters['ticker'];
                }

                if (parameters['tag'] !== undefined) {
                    queryParameters['tag'] = parameters['tag'];
                }

                if (parameters['sic'] !== undefined) {
                    queryParameters['sic'] = parameters['sic'];
                }

                if (parameters['cik'] !== undefined) {
                    queryParameters['cik'] = parameters['cik'];
                }

                if (parameters['fiscalYear'] !== undefined) {
                    queryParameters['fiscalYear'] = parameters['fiscalYear'];
                }

                if (parameters['fiscalPeriod'] !== undefined) {
                    queryParameters['fiscalPeriod'] = parameters['fiscalPeriod'];
                }

                if (parameters['aid'] !== undefined) {
                    queryParameters['aid'] = parameters['aid'];
                }

                if (parameters['cid'] !== undefined) {
                    queryParameters['cid'] = parameters['cid'];
                }

                if (parameters['networkIdentifier'] !== undefined) {
                    queryParameters['networkIdentifier'] = parameters['networkIdentifier'];
                }

                if (parameters['role'] !== undefined) {
                    queryParameters['role'] = parameters['role'];
                }

                if (parameters['disclosure'] !== undefined) {
                    queryParameters['disclosure'] = parameters['disclosure'];
                }

                if (parameters['reportElement'] !== undefined) {
                    queryParameters['reportElement'] = parameters['reportElement'];
                }

                if (parameters['label'] !== undefined) {
                    queryParameters['label'] = parameters['label'];
                }

                if (parameters['profileName'] !== undefined) {
                    queryParameters['profile-name'] = parameters['profileName'];
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
             * Retrieve the fact table for a given component. A component can be selected in three ways. (1) by component id (cid), (2) by accession number and disclosure (aid and disclosure), or (3) by CIK, fiscal year, fiscal period, and disclosure (cik, fiscalYear, fiscalPeriod, and disclosure).
             * @method
             * @name QueriesAPI#listFactTable
             * @param {{string}} format - The result format
             * @param {{string}} cid - [Deprecated] The id of the component
             * @param {{string}} aid - The accession number of the filing. This parameter needs to be used together with the disclosure parameter to identify a component.
             * @param {{string}} cik - [SEC profile] The CIK of an entity. This parameter needs to be used together with the fiscalYear, fiscalPeriod, and disclosure parameters to identify a component.
             * @param {{string}} ticker - [SEC profile] The ticker of the entity
             * @param {{string}} tag - [SEC profile] A tag to filter
             * @param {{string}} sic - [SEC profile] The industry group
             * @param {{string}} networkIdentifier - [SEC profile] The network identifier (=role) of a particular component
             * @param {{string}} role - The role of a particular component
             * @param {{string}} fiscalYear - [SEC profile] The fiscal year of the filing
             * @param {{string}} fiscalPeriod - [SEC profile] The fiscal period of the filing
             * @param {{string}} disclosure - [SEC profile] The disclosure of the component (e.g. BalanceSheet)
             * @param {{string}} label - A search term to search in the labels of components (e.g. stock)
             * @param {{boolean}} validate - Whether or not to stamp facts for validity (default is false)
             * @param {{string}} token - The token of the current session (if accessing entities beyond DOW30)
             * @param {{string}} additionalRules - The name of a report from which to use rules in addition to the component's rules (e.g. FundamentalAccountingConcepts)
             * @param {{string}} labels - Whether human readable labels should be included for concepts in each fact. (default: false)
             * @param {{string}} profileName - Specifies which profile to use. The default depends on the underlying repository.
             * @param {{}} _method - <p>This API allows its users to retrieve financial information provided to the US Securities and Exchange Commission (SEC) by public companies using the XBRL global standard technical syntax. Submitted XBRL information is read by the system, converted to a format which is optimized for query (as opposed to XBRL which is optimized for information exchange), and stored in a database in that queriable format. Additional metadata is added to the system which is commonly used when querying this financial information. Please note that only financial information provided within SEC forms 10-Q and 10-K is provided via this system.</p> <p>Information can be retrieved about entities, the submissions made by those entities, the components contained within those submissions, the model structure of a component, or the facts reported within a component.  All information is provided in the following formats:  JSON (the default), XML, CSV, and Excel.</p> <p>For more information about using this system, you can download this Excel spreadsheet which contains working examples.  Also, this getting started guide is helpful in understanding the information provided by this system.</p> <p>Please note that information outside of the DOW30 can only be accessed using a valid token that can be retrieved by creating an account on http://www.secxbrl.info and login is done using the Session API.</p> <p>Also note, that the POST method can be simulated by using GET and adding the _method=POST parameter to the HTTP request.</p><p>Please keep in mind that URLs are case sensitive. That is, all parameters need to be provided as shown in the documentation.</p>
             *
             */
            this.listFactTable = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/facttable-for-component.jq';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (parameters['format'] !== undefined) {
                    queryParameters['format'] = parameters['format'];
                }

                if (parameters['cid'] !== undefined) {
                    queryParameters['cid'] = parameters['cid'];
                }

                if (parameters['aid'] !== undefined) {
                    queryParameters['aid'] = parameters['aid'];
                }

                if (parameters['cik'] !== undefined) {
                    queryParameters['cik'] = parameters['cik'];
                }

                if (parameters['ticker'] !== undefined) {
                    queryParameters['ticker'] = parameters['ticker'];
                }

                if (parameters['tag'] !== undefined) {
                    queryParameters['tag'] = parameters['tag'];
                }

                if (parameters['sic'] !== undefined) {
                    queryParameters['sic'] = parameters['sic'];
                }

                if (parameters['networkIdentifier'] !== undefined) {
                    queryParameters['networkIdentifier'] = parameters['networkIdentifier'];
                }

                if (parameters['role'] !== undefined) {
                    queryParameters['role'] = parameters['role'];
                }

                if (parameters['fiscalYear'] !== undefined) {
                    queryParameters['fiscalYear'] = parameters['fiscalYear'];
                }

                if (parameters['fiscalPeriod'] !== undefined) {
                    queryParameters['fiscalPeriod'] = parameters['fiscalPeriod'];
                }

                if (parameters['disclosure'] !== undefined) {
                    queryParameters['disclosure'] = parameters['disclosure'];
                }

                if (parameters['label'] !== undefined) {
                    queryParameters['label'] = parameters['label'];
                }

                if (parameters['validate'] !== undefined) {
                    queryParameters['validate'] = parameters['validate'];
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                if (parameters['token'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                if (parameters['additionalRules'] !== undefined) {
                    queryParameters['additional-rules'] = parameters['additionalRules'];
                }

                if (parameters['labels'] !== undefined) {
                    queryParameters['labels'] = parameters['labels'];
                }

                if (parameters['profileName'] !== undefined) {
                    queryParameters['profile-name'] = parameters['profileName'];
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
             * Retrieve the business friendly Spreadsheet for a given component. A component can be selected in three ways. (1) by component id (cid), (2) by accession number and disclosure (aid and disclosure), or (3) by CIK, fiscal year, fiscal period, and disclosure (cik, fiscalYear, fiscalPeriod, and disclosure).
             * @method
             * @name QueriesAPI#spreadsheetForComponent
             * @param {{string}} format - The result format
             * @param {{string}} cid - [Deprecated] The id of the component
             * @param {{string}} aid - The accession number of the filing. This parameter needs to be used together with the disclosure parameter to identify a component.
             * @param {{string}} cik - [SEC profile] The CIK of an entity. This parameter needs to be used together with the fiscalYear, fiscalPeriod, and disclosure parameters to identify a component.
             * @param {{string}} ticker - [SEC profile] The ticker of the entity
             * @param {{string}} tag - [SEC profile] A tag to filter
             * @param {{string}} sic - [SEC profile] The industry group
             * @param {{string}} networkIdentifier - [SEC profile] The network identifier (=role) of a particular component
             * @param {{string}} role - The role of a particular component
             * @param {{string}} fiscalYear - [SEC profile] The fiscal year of the filing
             * @param {{string}} fiscalPeriod - [SEC profile] The fiscal period of the filing
             * @param {{string}} disclosure - [SEC profile] The disclosure of the component (e.g. BalanceSheet)
             * @param {{string}} label - A search term to search in the labels of components (e.g. stock)
             * @param {{boolean}} validate - Whether or not to stamp facts for validity (default is false)
             * @param {{string}} eliminate - Whether  to eliminate empty rows/columns
             * @param {{string}} token - The token of the current session (if accessing entities beyond DOW30)
             * @param {{string}} additionalRules - The name of a report from which to use rules in addition to the component's rules (e.g. FundamentalAccountingConcepts)
             * @param {{string}} profileName - Specifies which profile to use. The default depends on the underlying repository.
             * @param {{}} _method - <p>This API allows its users to retrieve financial information provided to the US Securities and Exchange Commission (SEC) by public companies using the XBRL global standard technical syntax. Submitted XBRL information is read by the system, converted to a format which is optimized for query (as opposed to XBRL which is optimized for information exchange), and stored in a database in that queriable format. Additional metadata is added to the system which is commonly used when querying this financial information. Please note that only financial information provided within SEC forms 10-Q and 10-K is provided via this system.</p> <p>Information can be retrieved about entities, the submissions made by those entities, the components contained within those submissions, the model structure of a component, or the facts reported within a component.  All information is provided in the following formats:  JSON (the default), XML, CSV, and Excel.</p> <p>For more information about using this system, you can download this Excel spreadsheet which contains working examples.  Also, this getting started guide is helpful in understanding the information provided by this system.</p> <p>Please note that information outside of the DOW30 can only be accessed using a valid token that can be retrieved by creating an account on http://www.secxbrl.info and login is done using the Session API.</p> <p>Also note, that the POST method can be simulated by using GET and adding the _method=POST parameter to the HTTP request.</p><p>Please keep in mind that URLs are case sensitive. That is, all parameters need to be provided as shown in the documentation.</p>
             *
             */
            this.spreadsheetForComponent = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/spreadsheet-for-component.jq';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (parameters['format'] !== undefined) {
                    queryParameters['format'] = parameters['format'];
                }

                if (parameters['cid'] !== undefined) {
                    queryParameters['cid'] = parameters['cid'];
                }

                if (parameters['aid'] !== undefined) {
                    queryParameters['aid'] = parameters['aid'];
                }

                if (parameters['cik'] !== undefined) {
                    queryParameters['cik'] = parameters['cik'];
                }

                if (parameters['ticker'] !== undefined) {
                    queryParameters['ticker'] = parameters['ticker'];
                }

                if (parameters['tag'] !== undefined) {
                    queryParameters['tag'] = parameters['tag'];
                }

                if (parameters['sic'] !== undefined) {
                    queryParameters['sic'] = parameters['sic'];
                }

                if (parameters['networkIdentifier'] !== undefined) {
                    queryParameters['networkIdentifier'] = parameters['networkIdentifier'];
                }

                if (parameters['role'] !== undefined) {
                    queryParameters['role'] = parameters['role'];
                }

                if (parameters['fiscalYear'] !== undefined) {
                    queryParameters['fiscalYear'] = parameters['fiscalYear'];
                }

                if (parameters['fiscalPeriod'] !== undefined) {
                    queryParameters['fiscalPeriod'] = parameters['fiscalPeriod'];
                }

                if (parameters['disclosure'] !== undefined) {
                    queryParameters['disclosure'] = parameters['disclosure'];
                }

                if (parameters['label'] !== undefined) {
                    queryParameters['label'] = parameters['label'];
                }

                if (parameters['validate'] !== undefined) {
                    queryParameters['validate'] = parameters['validate'];
                }

                if (parameters['eliminate'] !== undefined) {
                    queryParameters['eliminate'] = parameters['eliminate'];
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                if (parameters['token'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
                    return deferred.promise;
                }

                if (parameters['additionalRules'] !== undefined) {
                    queryParameters['additional-rules'] = parameters['additionalRules'];
                }

                if (parameters['profileName'] !== undefined) {
                    queryParameters['profile-name'] = parameters['profileName'];
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
             * [SEC profile] Retrieve the model structure for a given component. A component can be selected in three ways. (1) by component id (cid), (2) by accession number and disclosure (aid and disclosure), or (3) by CIK, fiscal year, fiscal period, and disclosure (cik, fiscalYear, fiscalPeriod, and disclosure).
             * @method
             * @name QueriesAPI#listModelStructure
             * @param {{string}} format - The result format
             * @param {{string}} cid - [Deprecated] The id of the component
             * @param {{string}} aid - The accession number of the filing. This parameter needs to be used together with the disclosure parameter to identify a component.
             * @param {{string}} cik - The CIK of an entity. This parameter needs to be used together with the fiscalYear, fiscalPeriod, and disclosure parameters to identify a component.
             * @param {{string}} ticker - The ticker of the entity
             * @param {{string}} tag - The tag to filter entities
             * @param {{string}} sic - The industry group
             * @param {{string}} networkIdentifier - The network identifier of a particular component
             * @param {{string}} fiscalYear - The fiscal year of the filing
             * @param {{string}} fiscalPeriod - The fiscal period of the filing
             * @param {{string}} disclosure - The disclosure of the component (e.g. BalanceSheet)
             * @param {{string}} token - The token of the current session (if accessing entities beyond DOW30)
             * @param {{}} _method - <p>This API allows its users to retrieve financial information provided to the US Securities and Exchange Commission (SEC) by public companies using the XBRL global standard technical syntax. Submitted XBRL information is read by the system, converted to a format which is optimized for query (as opposed to XBRL which is optimized for information exchange), and stored in a database in that queriable format. Additional metadata is added to the system which is commonly used when querying this financial information. Please note that only financial information provided within SEC forms 10-Q and 10-K is provided via this system.</p> <p>Information can be retrieved about entities, the submissions made by those entities, the components contained within those submissions, the model structure of a component, or the facts reported within a component.  All information is provided in the following formats:  JSON (the default), XML, CSV, and Excel.</p> <p>For more information about using this system, you can download this Excel spreadsheet which contains working examples.  Also, this getting started guide is helpful in understanding the information provided by this system.</p> <p>Please note that information outside of the DOW30 can only be accessed using a valid token that can be retrieved by creating an account on http://www.secxbrl.info and login is done using the Session API.</p> <p>Also note, that the POST method can be simulated by using GET and adding the _method=POST parameter to the HTTP request.</p><p>Please keep in mind that URLs are case sensitive. That is, all parameters need to be provided as shown in the documentation.</p>
             *
             */
            this.listModelStructure = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/modelstructure-for-component.jq';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (parameters['format'] !== undefined) {
                    queryParameters['format'] = parameters['format'];
                }

                if (parameters['cid'] !== undefined) {
                    queryParameters['cid'] = parameters['cid'];
                }

                if (parameters['aid'] !== undefined) {
                    queryParameters['aid'] = parameters['aid'];
                }

                if (parameters['cik'] !== undefined) {
                    queryParameters['cik'] = parameters['cik'];
                }

                if (parameters['ticker'] !== undefined) {
                    queryParameters['ticker'] = parameters['ticker'];
                }

                if (parameters['tag'] !== undefined) {
                    queryParameters['tag'] = parameters['tag'];
                }

                if (parameters['sic'] !== undefined) {
                    queryParameters['sic'] = parameters['sic'];
                }

                if (parameters['networkIdentifier'] !== undefined) {
                    queryParameters['networkIdentifier'] = parameters['networkIdentifier'];
                }

                if (parameters['fiscalYear'] !== undefined) {
                    queryParameters['fiscalYear'] = parameters['fiscalYear'];
                }

                if (parameters['fiscalPeriod'] !== undefined) {
                    queryParameters['fiscalPeriod'] = parameters['fiscalPeriod'];
                }

                if (parameters['disclosure'] !== undefined) {
                    queryParameters['disclosure'] = parameters['disclosure'];
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
             * Retrieve the fact table for a given report. Filters can be overriden. Filters MUST be overriden if the report is not already filtering.
             * @method
             * @name QueriesAPI#listFactTableForReport
             * @param {{string}} format - The result format
             * @param {{string}} cik - [SEC profile] The CIK of the entity
             * @param {{string}} ticker - [SEC profile] The ticker of the entity
             * @param {{string}} tag - [SEC profile] The tag to filter entities
             * @param {{string}} sic - [SEC profile] The industry group
             * @param {{string}} fiscalYear - [SEC profile] The fiscal year of the fact to retrieve (default: LATEST)
             * @param {{string}} fiscalPeriod - [SEC profile] The fiscal period of the fact to retrieve (default: FY). Can select multiple.
             * @param {{string}} fiscalPeriodType - [SEC profile] The fiscal period type of the fact to retrieve (default: instant+YTD). Can select multiple.
             * @param {{string}} report - The name of the report to be used (e.g. FundamentalAccountingConcepts)
             * @param {{string}} validate - Validate and stamp facts accordingly
             * @param {{string}} labels - Whether human readable labels should be included for concepts in each fact. (default: false)
             * @param {{string}} profileName - Specifies which profile to use. The default depends on the underlying repository.
             * @param {{}} _method - <p>This API allows its users to retrieve financial information provided to the US Securities and Exchange Commission (SEC) by public companies using the XBRL global standard technical syntax. Submitted XBRL information is read by the system, converted to a format which is optimized for query (as opposed to XBRL which is optimized for information exchange), and stored in a database in that queriable format. Additional metadata is added to the system which is commonly used when querying this financial information. Please note that only financial information provided within SEC forms 10-Q and 10-K is provided via this system.</p> <p>Information can be retrieved about entities, the submissions made by those entities, the components contained within those submissions, the model structure of a component, or the facts reported within a component.  All information is provided in the following formats:  JSON (the default), XML, CSV, and Excel.</p> <p>For more information about using this system, you can download this Excel spreadsheet which contains working examples.  Also, this getting started guide is helpful in understanding the information provided by this system.</p> <p>Please note that information outside of the DOW30 can only be accessed using a valid token that can be retrieved by creating an account on http://www.secxbrl.info and login is done using the Session API.</p> <p>Also note, that the POST method can be simulated by using GET and adding the _method=POST parameter to the HTTP request.</p><p>Please keep in mind that URLs are case sensitive. That is, all parameters need to be provided as shown in the documentation.</p>
             * @param {{string}} token - The token of the current session (if accessing entities beyond DOW30)
             *
             */
            this.listFactTableForReport = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/facttable-for-report.jq';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (parameters['format'] !== undefined) {
                    queryParameters['format'] = parameters['format'];
                }

                if (parameters['cik'] !== undefined) {
                    queryParameters['cik'] = parameters['cik'];
                }

                if (parameters['ticker'] !== undefined) {
                    queryParameters['ticker'] = parameters['ticker'];
                }

                if (parameters['tag'] !== undefined) {
                    queryParameters['tag'] = parameters['tag'];
                }

                if (parameters['sic'] !== undefined) {
                    queryParameters['sic'] = parameters['sic'];
                }

                if (parameters['fiscalYear'] !== undefined) {
                    queryParameters['fiscalYear'] = parameters['fiscalYear'];
                }

                if (parameters['fiscalPeriod'] !== undefined) {
                    queryParameters['fiscalPeriod'] = parameters['fiscalPeriod'];
                }

                if (parameters['fiscalPeriodType'] !== undefined) {
                    queryParameters['fiscalPeriodType'] = parameters['fiscalPeriodType'];
                }

                if (parameters['report'] !== undefined) {
                    queryParameters['report'] = parameters['report'];
                }

                if (parameters['labels'] !== undefined) {
                    queryParameters['labels'] = parameters['labels'];
                }

                if (parameters['profileName'] !== undefined) {
                    queryParameters['profile-name'] = parameters['profileName'];
                }

                if (parameters['_method'] !== undefined) {
                    queryParameters['_method'] = parameters['_method'];
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                if (parameters['token'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
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
             * Retrieve the business-friendly spreadsheet for a report. Filters can be overriden. Filters MUST be overriden if the report is not already filtering.
             * @method
             * @name QueriesAPI#listSpreadsheetForReport
             * @param {{string}} format - The result format
             * @param {{string}} cik - [SEC profile] The CIK of the entity
             * @param {{string}} ticker - [SEC profile] The ticker of the entity
             * @param {{string}} tag - [SEC profile] The tag to filter entities
             * @param {{string}} sic - [SEC profile] The industry group
             * @param {{string}} fiscalYear - [SEC profile] The fiscal year of the fact to retrieve (default: LATEST)
             * @param {{string}} fiscalPeriod - [SEC profile] The fiscal period of the fact to retrieve (default: FY)
             * @param {{string}} fiscalPeriodType - [SEC profile] The fiscal period type of the fact to retrieve (default: instant+YTD). Can select multiple, but preferably not both YTD and QTD.
             * @param {{string}} report - The name of the report to be used (e.g. FundamentalAccountingConcepts)
             * @param {{string}} eliminate - Wwether to eliminate empty rows/colummns
             * @param {{string}} validate - Validate and stamp facts accordingly
             * @param {{string}} profileName - Specifies which profile to use. The default depends on the underlying repository.
             * @param {{string}} token - The token of the current session (if accessing entities beyond DOW30)
             *
             */
            this.listSpreadsheetForReport = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/spreadsheet-for-report.jq';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (parameters['format'] !== undefined) {
                    queryParameters['format'] = parameters['format'];
                }

                if (parameters['cik'] !== undefined) {
                    queryParameters['cik'] = parameters['cik'];
                }

                if (parameters['ticker'] !== undefined) {
                    queryParameters['ticker'] = parameters['ticker'];
                }

                if (parameters['tag'] !== undefined) {
                    queryParameters['tag'] = parameters['tag'];
                }

                if (parameters['sic'] !== undefined) {
                    queryParameters['sic'] = parameters['sic'];
                }

                if (parameters['fiscalYear'] !== undefined) {
                    queryParameters['fiscalYear'] = parameters['fiscalYear'];
                }

                if (parameters['fiscalPeriod'] !== undefined) {
                    queryParameters['fiscalPeriod'] = parameters['fiscalPeriod'];
                }

                if (parameters['fiscalPeriodType'] !== undefined) {
                    queryParameters['fiscalPeriodType'] = parameters['fiscalPeriodType'];
                }

                if (parameters['report'] !== undefined) {
                    queryParameters['report'] = parameters['report'];
                }

                if (parameters['eliminate'] !== undefined) {
                    queryParameters['eliminate'] = parameters['eliminate'];
                }

                if (parameters['validate'] !== undefined) {
                    queryParameters['validate'] = parameters['validate'];
                }

                if (parameters['profileName'] !== undefined) {
                    queryParameters['profile-name'] = parameters['profileName'];
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                if (parameters['token'] === undefined) {
                    deferred.reject(new Error('Missing required query parameter: token'));
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
             * Retrieve one or more facts for a combination of filings.
             * @method
             * @name QueriesAPI#listFacts
             * @param {{string}} format - The result format
             * @param {{string}} cik - [SEC profile] The CIK of the entity
             * @param {{string}} ticker - [SEC profile] The ticker of the entity
             * @param {{string}} tag - [SEC profile] The tag to filter entities
             * @param {{string}} sic - [SEC profile] The industry group
             * @param {{string}} aid - The id of the filing
             * @param {{string}} fiscalYear - [SEC profile] The fiscal year of the fact to retrieve (default: LATEST)
             * @param {{string}} concept - The name of the concept to retrieve the fact for (alternatively, a parameter with name xbrl:Concept can be used).
             * @param {{string}} fiscalPeriod - [SEC profile] The fiscal period of the fact to retrieve (default: FY)
             * @param {{string}} fiscalPeriodType - [SEC profile] The fiscal period type of the fact to retrieve (default: instant+YTD). Can select multiple.
             * @param {{string}} map - [Deprecated, use report] The concept map that should be used to resolve the concept (default: none)
             * @param {{string}} rules - [Deprecated, use report] The rules that should be used to resolve the concept (default: none)
             * @param {{string}} report - The report to use as a context to retrieve the facts. In particular, concept maps and rules found in this report will be used. (default: none)
             * @param {{string}} additionalRules - The name of a report from which to use rules in addition to a report's rules (e.g. FundamentalAccountingConcepts)
             * @param {{string}} labels - Whether human readable labels should be included for concepts in each fact. (default: false)
             * @param {{string}} profileName - Specifies which profile to use. The default depends on the underlying repository.
             * @param {{string}} prefix:dimension - The name of a dimension used for filtering. Accepted format: prefix:dimension. As a value, the value of the dimension or ALL can be provided if all facts with this dimension should be retrieved
             * @param {{string}} prefix:dimension::default - The default value of the dimension [prefix:dimension] that should be returned if the dimension was not provided explicitly for a fact. Accepted format: prefix:dimension::default
             * @param {{string}} token - The token of the current session (if accessing entities beyond DOW30)
             * @param {{}} _method - <p>This API allows its users to retrieve financial information provided to the US Securities and Exchange Commission (SEC) by public companies using the XBRL global standard technical syntax. Submitted XBRL information is read by the system, converted to a format which is optimized for query (as opposed to XBRL which is optimized for information exchange), and stored in a database in that queriable format. Additional metadata is added to the system which is commonly used when querying this financial information. Please note that only financial information provided within SEC forms 10-Q and 10-K is provided via this system.</p> <p>Information can be retrieved about entities, the submissions made by those entities, the components contained within those submissions, the model structure of a component, or the facts reported within a component.  All information is provided in the following formats:  JSON (the default), XML, CSV, and Excel.</p> <p>For more information about using this system, you can download this Excel spreadsheet which contains working examples.  Also, this getting started guide is helpful in understanding the information provided by this system.</p> <p>Please note that information outside of the DOW30 can only be accessed using a valid token that can be retrieved by creating an account on http://www.secxbrl.info and login is done using the Session API.</p> <p>Also note, that the POST method can be simulated by using GET and adding the _method=POST parameter to the HTTP request.</p><p>Please keep in mind that URLs are case sensitive. That is, all parameters need to be provided as shown in the documentation.</p>
             *
             */
            this.listFacts = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/facts.jq';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (parameters['format'] !== undefined) {
                    queryParameters['format'] = parameters['format'];
                }

                if (parameters['cik'] !== undefined) {
                    queryParameters['cik'] = parameters['cik'];
                }

                if (parameters['ticker'] !== undefined) {
                    queryParameters['ticker'] = parameters['ticker'];
                }

                if (parameters['tag'] !== undefined) {
                    queryParameters['tag'] = parameters['tag'];
                }

                if (parameters['sic'] !== undefined) {
                    queryParameters['sic'] = parameters['sic'];
                }

                if (parameters['aid'] !== undefined) {
                    queryParameters['aid'] = parameters['aid'];
                }

                if (parameters['fiscalYear'] !== undefined) {
                    queryParameters['fiscalYear'] = parameters['fiscalYear'];
                }

                if (parameters['concept'] !== undefined) {
                    queryParameters['concept'] = parameters['concept'];
                }

                if (parameters['fiscalPeriod'] !== undefined) {
                    queryParameters['fiscalPeriod'] = parameters['fiscalPeriod'];
                }

                if (parameters['fiscalPeriodType'] !== undefined) {
                    queryParameters['fiscalPeriodType'] = parameters['fiscalPeriodType'];
                }

                if (parameters['map'] !== undefined) {
                    queryParameters['map'] = parameters['map'];
                }

                if (parameters['rules'] !== undefined) {
                    queryParameters['rules'] = parameters['rules'];
                }

                if (parameters['report'] !== undefined) {
                    queryParameters['report'] = parameters['report'];
                }

                if (parameters['additionalRules'] !== undefined) {
                    queryParameters['additional-rules'] = parameters['additionalRules'];
                }

                if (parameters['labels'] !== undefined) {
                    queryParameters['labels'] = parameters['labels'];
                }

                if (parameters['profileName'] !== undefined) {
                    queryParameters['profile-name'] = parameters['profileName'];
                }

                if (parameters['prefix:dimension'] !== undefined) {
                    queryParameters['prefix:dimension'] = parameters['prefix:dimension'];
                }

                if (parameters['prefix:dimension::default'] !== undefined) {
                    queryParameters['prefix:dimension::default'] = parameters['prefix:dimension::default'];
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
             * Retrieve the report elements contained in a set of filings.
             * @method
             * @name QueriesAPI#listReportElements
             * @param {{string}} format - The result format
             * @param {{string}} tag - [SEC profile] A tag to filter entities
             * @param {{string}} cik - [SEC profile] A CIK number
             * @param {{string}} ticker - [SEC profile] A ticker symbols
             * @param {{string}} sic - [SEC profile] The industry group
             * @param {{string}} fiscalYear - [SEC profile] The fiscal year focus of the component to retrieve (default: ALL)
             * @param {{string}} fiscalPeriod - [SEC profile] The fiscal period focus of the component to retrieve (default: FY)
             * @param {{string}} aid - The id of the filing
             * @param {{string}} onlyNames - Whether only the names of the report elements should be returned. If so, the values don't contain duplicates. (default: false)
             * @param {{string}} name - The name of the report element to return (e.g. us-gaap:Assets).
             * @param {{string}} map - [Deprecated, use report] The concept map that should be used to resolve the concept (default: none)
             * @param {{string}} report - The report to use as a context to retrieve the report elements. In particular, concept maps found in this report will be used. (default: none)
             * @param {{string}} label - A search term to search in the labels of report elements (e.g. stock)
             * @param {{string}} token - The token of the current session (if accessing entities beyond DOW30)
             * @param {{}} _method - <p>This API allows its users to retrieve financial information provided to the US Securities and Exchange Commission (SEC) by public companies using the XBRL global standard technical syntax. Submitted XBRL information is read by the system, converted to a format which is optimized for query (as opposed to XBRL which is optimized for information exchange), and stored in a database in that queriable format. Additional metadata is added to the system which is commonly used when querying this financial information. Please note that only financial information provided within SEC forms 10-Q and 10-K is provided via this system.</p> <p>Information can be retrieved about entities, the submissions made by those entities, the components contained within those submissions, the model structure of a component, or the facts reported within a component.  All information is provided in the following formats:  JSON (the default), XML, CSV, and Excel.</p> <p>For more information about using this system, you can download this Excel spreadsheet which contains working examples.  Also, this getting started guide is helpful in understanding the information provided by this system.</p> <p>Please note that information outside of the DOW30 can only be accessed using a valid token that can be retrieved by creating an account on http://www.secxbrl.info and login is done using the Session API.</p> <p>Also note, that the POST method can be simulated by using GET and adding the _method=POST parameter to the HTTP request.</p><p>Please keep in mind that URLs are case sensitive. That is, all parameters need to be provided as shown in the documentation.</p>

             * 
             */
            this.listReportElements = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/report-elements.jq';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (parameters['format'] !== undefined) {
                    queryParameters['format'] = parameters['format'];
                }

                if (parameters['tag'] !== undefined) {
                    queryParameters['tag'] = parameters['tag'];
                }

                if (parameters['cik'] !== undefined) {
                    queryParameters['cik'] = parameters['cik'];
                }

                if (parameters['ticker'] !== undefined) {
                    queryParameters['ticker'] = parameters['ticker'];
                }

                if (parameters['sic'] !== undefined) {
                    queryParameters['sic'] = parameters['sic'];
                }

                if (parameters['fiscalYear'] !== undefined) {
                    queryParameters['fiscalYear'] = parameters['fiscalYear'];
                }

                if (parameters['fiscalPeriod'] !== undefined) {
                    queryParameters['fiscalPeriod'] = parameters['fiscalPeriod'];
                }

                if (parameters['aid'] !== undefined) {
                    queryParameters['aid'] = parameters['aid'];
                }

                if (parameters['onlyNames'] !== undefined) {
                    queryParameters['onlyNames'] = parameters['onlyNames'];
                }

                if (parameters.name !== undefined) {
                    body = parameters['name'];
                }

                if (parameters['map'] !== undefined) {
                    queryParameters['map'] = parameters['map'];
                }

                if (parameters['report'] !== undefined) {
                    queryParameters['report'] = parameters['report'];
                }

                if (parameters['label'] !== undefined) {
                    queryParameters['label'] = parameters['label'];
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

                headers['Content-Type'] = 'application/x-www-form-urlencoded';

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
        };
    }]);