angular.module('api', ['session-api', 'users-api', 'billing-api', 'constants'])
.factory('API', function(SessionAPI, UsersAPI, BillingAPI, API_URL) {
    'use strict';

    return {
        Session: new SessionAPI(API_URL + '/_queries/public'),
        Users: new UsersAPI(API_URL + '/_queries/public'),
        Billing: new BillingAPI(API_URL + '/_queries/public')
    };
});