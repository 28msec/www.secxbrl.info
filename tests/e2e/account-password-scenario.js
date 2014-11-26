'use strict';

describe('Private Account Password Page', function(){

    var HomePage = require('../../app/home/home-page');
    var home = new HomePage();
    var password = home.account.password;
    var config = require('./config/config').config;

    var newPwd = '123abc';
    var incorrectPwd = 'incorrectPwd';

    it('should display password changing form', function() {
        password.visitPage();
        expect(password.form.isDisplayed()).toBe(true);
    });

    it('should fail to update password 1', function() {
        password.changePassword(config.testPassword, 'foo', '');
        expect(password.form.errors.passwordTooShort.isDisplayed()).toBe(true);
        expect(password.form.errors.passwordsDontMatch.isDisplayed()).toBe(true);
    });

    it('should fail to update password 2', function() {
        password.changePassword('', '', '');
        expect(password.form.errors.oldPasswordRequired.isDisplayed()).toBe(true);
        expect(password.form.errors.passwordRequired.isDisplayed()).toBe(true);
        expect(password.form.errors.confirmationRequired.isDisplayed()).toBe(true);
    });

    it('should fail to update password 3', function() {
        password.changePassword(incorrectPwd, newPwd, newPwd);
        expect(password.form.errors.oldPasswordIncorrect.isDisplayed()).toBe(true);
    });

    it('should be able to update password', function() {
        password.changePassword(config.testPassword, newPwd, newPwd);
        expect(home.alert.header.getText()).toBe('Success');
    });

    it('should reset the password to the one configured for the tests', function() {
        // reset
        password.visitPage();
        password.changePassword(newPwd, config.testPassword, config.testPassword);
        expect(home.alert.header.getText()).toBe('Success');
    });

});

