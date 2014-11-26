/*global browser:false, element:false, by:false */
'use strict';

var _ = require('lodash');

var AppPage = require('../../app-page.js').AppPage;

function ResetPage() {
    AppPage.call(this);
    this.changeForm = element(by.name('changeForm'));
    this.password = element(by.model('password'));
    this.passwordRepeat = element(by.model('passwordRepeat'));

    this.form = {};
    this.form.errors = {};
    this.form.errors.passwordRequired = element(by.id('password-required'));
    this.form.errors.passwordMinLength = element(by.id('password-minlength'));
    this.form.errors.passwordRepeatRequired = element(by.id('password-repeat-required'));
    this.form.errors.passwordRepeatDoesntMatch = element(by.id('password-repeat-doesnt-match'));
}
ResetPage.prototype = _.create(AppPage.prototype);

ResetPage.prototype.visitPage = function(email, token){
    return browser.get('/auth/reset?email=' + encodeURIComponent(email) + '&resetToken=' + encodeURIComponent(token));
};

ResetPage.prototype.resetPassword = function(password, passwordRepeat){
    this.password.clear();
    this.password.sendKeys(password);
    this.passwordRepeat.clear();
    this.passwordRepeat.sendKeys(passwordRepeat);
    return this.changeForm.submit();
};

module.exports = ResetPage;
