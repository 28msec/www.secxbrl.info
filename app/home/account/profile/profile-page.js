/*global browser:false, element:false, by:false */
'use strict';

function ProfilePage(){
    this.form = element(by.name('updateProfileForm'));
    this.firstname = element(by.id('firstname'));
    this.lastname = element(by.id('lastname'));
}

ProfilePage.prototype.changeName = function(firstname, lastname) {
    this.firstname.clear();
    this.firstname.sendKeys(firstname);
    this.lastname.clear();
    this.lastname.sendKeys(lastname);
    this.form.submit();
};

ProfilePage.prototype.visitPage = function(){
    return browser.get('/account');
};

module.exports = ProfilePage;


