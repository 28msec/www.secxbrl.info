'use strict';

//https://github.com/angular/protractor/blob/master/docs/api.md
//GetAttribute() returns "boolean" values and will return either "true" or null

describe('Authentication', function(){

    var AuthPage = require('../../app/auth/auth-page');
    var auth = new AuthPage();
    var login = auth.login;
    var config = require('./config/config').config;

    it('should have been redirected to the auth page', function() {
        auth.doLogout();
        auth.getCurrentUrl().then(function(url){
            expect(url.substring(url.length - '/'.length)).toBe('/');
        });
    });

    it('shouldn\'t login', function(){
        login.visitPage();
        login.login('support@28.io', 'hello');
        expect(login.wrongCombinationMessage().isDisplayed()).toBe(true);
    });
    
    it('should login', function(){
        login.login('support@28.io', config.testPassword);
        login.getCurrentUrl().then(function(url) {
            expect(url.substring(url.length - '/account'.length)).toBe('/account');
        });
    });
});
