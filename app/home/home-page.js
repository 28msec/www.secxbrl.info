/*global element:false, by:false  */
'use strict';

var StartPage = require('./start/start-page');
var APIPage = require('./api/api-page');
var PricingPage = require('./pricing/pricing-page');
var AccountPage = require('./account/account-page');

function HomePage(){
    this.alert = {};
    this.alert.header = element(by.id('alert-header'));
    this.alert.body = element(by.id('alert-body'));

    this.error = {};
    this.error.header = element(by.id('error-header'));
    this.error.body = element(by.id('error-body'));
    this.error.messages = element.all(by.repeater('message in errorObject.message'));

    this.pricing  = new PricingPage();
    this.account = new AccountPage();
    this.start = new StartPage();
    this.api = new APIPage();
}

module.exports = HomePage;
