/*global browser:false, element:false, by:false  */
'use strict';

function PasswordPage(){
    this.form = element(by.name('resetForm'));
    this.oldPassword = element(by.name('password'));
    this.newPassword1 = element(by.name('passwordNew'));
    this.newPassword2 = element(by.name('passwordRepeat'));
 
    this.form.errors = {};
    this.form.errors.oldPasswordRequired = element(by.id('oldpassword-required'));
    this.form.errors.oldPasswordIncorrect = element(by.id('oldpassword-incorrect'));
    this.form.errors.passwordRequired = element(by.id('password-required'));
    this.form.errors.passwordTooShort = element(by.id('password-too-short'));
    this.form.errors.confirmationRequired = element(by.id('confirmation-required'));
    this.form.errors.passwordsDontMatch = element(by.id('passwords-dont-match'));
}

PasswordPage.prototype.changePassword = function(oldPwd, newPwd) {
    this.oldPassword.clear();
    this.oldPassword.sendKeys(oldPwd);
    this.newPassword1.clear();
    this.newPassword1.sendKeys(newPwd);
    this.newPassword2.clear();
    this.newPassword2.sendKeys(newPwd);
    this.form.submit();
};

PasswordPage.prototype.visitPage = function(){
    return browser.get('/account/password');
};

module.exports = PasswordPage;
