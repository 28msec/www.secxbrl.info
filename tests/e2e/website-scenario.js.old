'use strict';

//https://github.com/angular/protractor/blob/master/docs/api.md
//GetAttribute() returns "boolean" values and will return either "true" or null

describe('Public SecXBRL.info Website', function(){

    var HomePage = require('../../app/home/home-page');
    var home = new HomePage();
    var pricing = home.pricing;
    var start = home.start;
    var api = home.api;

    it('should have working sign up buttons on start page', function() {
        start.visitPage();
        start.signUpButtons.each(function(button) {
            button.click();
            expect(start.jumbotron.isPresent()).toBe(false);
            start.visitPage();
            expect(start.jumbotron.isPresent()).toBe(true);
        });
    });

    it('should have free and enterprice package descriptions on pricing page', function() {
        pricing.visitPage();
        expect(pricing.descriptions.count()).toBe(2);
        // number of features of Free and enterprise package
        expect(pricing.includedFeatures.count()).toBe(14);
    });

    it('should have an API page displaying the API endpoints and a description', function() {
        api.visitPage();
        expect(api.description.getText()).not.toBe('');
        expect(api.description.getText()).toBeDefined();
        expect(api.apiLinks.count()).toBeGreaterThan(9);
        expect(api.apiDetails.count()).toBeGreaterThan(9);
    });

});
