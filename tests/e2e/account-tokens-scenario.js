'use strict';

describe('Private Account Tokens Page', function(){

    var HomePage = require('../../app/home/home-page');
    var home = new HomePage();
    var tokens = home.account.tokens;
    var config = require('./config/config').config;

    var numTokens = 0;

    it('should display create token button', function() {
        tokens.visitPage();
        expect(tokens.buttons.create.isDisplayed()).toBe(true);
    });

    it('should display at least 2 tokens', function() {
        tokens.tokens.count().then(function(count) {
            numTokens = count;
            // at least test token and disclosure app token should be there
            expect(numTokens).toBeGreaterThan(1);
        });
    });

    it('should display the create token modal', function() {
        tokens.showCreateToken();
        expect(tokens.createTokenForm.isDisplayed()).toBe(true);
    });

    it('should fill in the create-token form', function() {
        // expiration: tomorrow minus one minute
        var date = new Date();

        date.setDate(date.getDate() + 1);
        date.setMinutes(date.getMinutes() - 1);

        tokens.fillInCreateTokenForm(date.getFullYear(),
                date.getMonth() + 1, // date month start with 0 for January
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            config.testPassword);

        expect(tokens.getHoursFromCreateTokeForm()).toBe(date.getHours());
        expect(tokens.getMinutesFromCreateTokeForm()).toBe(date.getMinutes());
    });

    it('should create a short lived token', function() {
        tokens.submitCreateToken();
        expect(home.error.messages.count()).toBe(0);
    });

    it('should list the newly created token', function() {
        tokens.visitPage();
        //expect(tokens.tokens.count()).toBe(numTokens + 1);
        expect(tokens.createTokenForm.isPresent()).toBe(false);
    });

    it('should display the revoke token modal', function() {
        tokens.showRevokeExpiring();
        expect(tokens.revokeTokenForm.isDisplayed()).toBe(true);
    });

    it('should revoke the expiring token', function() {
        // we created an expiring token (< 1 Day)
        // now, lets revoke it again:
        tokens.revokeExpiring(config.testPassword);
        expect(tokens.tokens.count()).toBeLessThan(numTokens+1);
        expect(tokens.tokens.count()).toBeGreaterThan(1);
    });

});
