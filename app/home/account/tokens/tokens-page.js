/*global browser:false, element:false, by:false  */
'use strict';

function TokensPage(){
    this.tokens = element.all(by.repeater('t in tokens'));
 
    this.createTokenForm = element(by.name('createTokenForm'));
    this.revokeTokenForm = element(by.name('revokeTokenForm'));
 
    this.password = element(by.name('password'));
    this.expiration = element(by.id('expiration-date'));
    this.hours = element(by.model('hours'));
    this.minutes = element(by.model('minutes'));
 
    this.buttons = {};
    this.buttons.create = element(by.id('btn-create'));
    this.buttons.createTokenButton = element(by.id('btn-createTokenButton'));
    this.buttons.revokeExpiring = element(by.xpath('//tr[contains(@ng-repeat, "t in tokens") and contains(@class, "warning")]/td/button'));
}

TokensPage.prototype.showCreateToken = function() {
    return this.buttons.create.click();
};

TokensPage.prototype.fillInCreateTokenForm = function(year, month, day, hours, minutes, pwd){
    var yearString = '' + year;
    var monthString = '' + month;
    var dayString = '' + day;
    if(monthString.length === 1){
        monthString = '0' + monthString;
    }
    if(dayString.length === 1){
        dayString = '0' + dayString;
    }
    var expiration = '' + yearString + '-' + monthString + '-' + dayString;
    this.expiration.clear();
    this.expiration.sendKeys(expiration);
    this.hours.clear();
    this.hours.sendKeys('' + hours);
    this.minutes.clear();
    this.minutes.sendKeys('' + minutes);
    this.password.clear();
    return this.password.sendKeys(pwd);
};

var getIntegerValueFromInput = function(element){
    return element.getAttribute('value').then(function(value){return parseInt(value, 10);});
};

TokensPage.prototype.getHoursFromCreateTokeForm = function(){
    return getIntegerValueFromInput(this.hours);
};

TokensPage.prototype.getMinutesFromCreateTokeForm = function(){
    return getIntegerValueFromInput(this.minutes);
};

TokensPage.prototype.submitCreateToken = function(){
    return this.buttons.createTokenButton.click();
};

TokensPage.prototype.showRevokeExpiring = function(){
    return this.buttons.revokeExpiring.click();
};

TokensPage.prototype.revokeExpiring = function(pwd){
    this.password.clear();
    this.password.sendKeys(pwd);
    return this.revokeTokenForm.submit();
};

TokensPage.prototype.visitPage = function(){
    return browser.get('/account/tokens');
};

module.exports = TokensPage;

