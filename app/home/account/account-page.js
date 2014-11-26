/*global browser:false  */
'use strict';

var ProfilePage = require('./profile/profile-page');
var StatsPage = require('./stats/stats-page');
var PasswordPage = require('./password/password-page');
var TokensPage = require('./tokens/tokens-page');

function AccountPage(){
    this.profile = new ProfilePage();
    this.stats  = new StatsPage();
    this.password  = new PasswordPage();
    this.tokens  = new TokensPage();
}

AccountPage.prototype.visitPage = function(){
    return browser.get('/account');
};

module.exports = AccountPage;

