/*global browser:false, element:false, by:false */
'use strict';

var _ = require('lodash');

var AppPage = require('../../app-page.js').AppPage;

function LoginPage(){
    AppPage.call(this);
    this.loginForm = element(by.name('loginForm'));
    this.loginEmail = element(by.model('loginEmail'));
    this.password = element(by.model('loginPassword'));

    this.forgotForm = element(by.name('forgotForm'));
    this.showForgotPasswordLink = element(by.id('show-forgot-password-link'));
    this.forgotEmail = element(by.model('forgotEmail'));

    this.form = {};
    this.form.errors = {};
    this.form.errors.forgotEmailRequired = element(by.id('forgot-email-required'));
    this.form.errors.forgotEmailInvalid = element(by.id('forgot-email-invalid'));

}
LoginPage.prototype = _.create(AppPage.prototype);

LoginPage.prototype.visitPage = function(){
    return browser.get('/auth');
};

LoginPage.prototype.showPasswordReset = function(){
    return this.showForgotPasswordLink.click();
};

LoginPage.prototype.requestResetPassword = function(email){
    this.forgotEmail.clear();
    this.forgotEmail.sendKeys(email);
    return this.forgotForm.submit();
};

LoginPage.prototype.login = function(email, password){
    this.loginEmail.clear();
    this.loginEmail.sendKeys(email);
    this.password.clear();
    this.password.sendKeys(password);
    return this.loginForm.submit();
};

LoginPage.prototype.wrongCombinationMessage = function(){
    return element(by.id('wrong-combination'));
};

module.exports = LoginPage;
