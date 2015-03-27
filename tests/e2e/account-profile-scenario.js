'use strict';

describe('Private Account Profile Page', function(){

    var HomePage = require('../../app/home/home-page');
    var home = new HomePage();
    var profile = home.account.profile;
    var config = require('./config/config').config;

    it('should display profile update form', function() {
        profile.visitPage();
        expect(profile.form.isDisplayed()).toBe(true);
    });

    it('should update the name of the user', function() {
        profile.changeName('Hercule', 'Poirot');
        expect(home.alert.header.getText()).toBe('Success');
    });

    it('should persist updates to the user profile', function() {
        // reload page to test persistency
        profile.visitPage();
        expect(profile.firstname.getAttribute('value')).toBe('Hercule');
        expect(profile.lastname.getAttribute('value')).toBe('Poirot');
    });

    it('should reset name of user to the default name', function() {
        // reset
        profile.changeName('System', 'Administrator');
        expect(profile.firstname.getAttribute('value')).toBe('System');
        expect(profile.lastname.getAttribute('value')).toBe('Administrator');
        expect(home.alert.header.getText()).toBe('Success');
    });

    it('should have a working cell store manager link', function() {
        home.account.clickCellStoreManagerLink().then(
            function(response){
                expect(response.status).toBe(200);
            }
        );
    });

});