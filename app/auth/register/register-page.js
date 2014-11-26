/*global browser:false */
'use strict';

var _ = require('lodash');

var AppPage = require('../../app-page.js').AppPage;
var RegistrationModule = require('../../modules/ui/registration-page');

function RegisterPage(){
    AppPage.call(this);
    this.registration = new RegistrationModule();
}
RegisterPage.prototype = _.create(AppPage.prototype);

RegisterPage.prototype.visitPage = function(){
    return browser.get('/auth/sign-up');
};

module.exports = RegisterPage;
