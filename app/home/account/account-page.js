/*global browser:false, element:false, by:false, protractor:false */
'use strict';

var ProfilePage = require('./profile/profile-page');
var StatsPage = require('./stats/stats-page');
var PasswordPage = require('./password/password-page');
var TokensPage = require('./tokens/tokens-page');
var http = require('http');

function AccountPage(){
    this.profile = new ProfilePage();
    this.stats  = new StatsPage();
    this.password  = new PasswordPage();
    this.tokens  = new TokensPage();

    this.cellStoreManagerLink = element(by.css('a.cellstore-manager-link'));
}

AccountPage.prototype.visitPage = function(){
    return browser.get('/account');
};

AccountPage.prototype.clickCellStoreManagerLink = function(){
    var deferred = protractor.promise.defer();
    this.cellStoreManagerLink.getAttribute('href')
        .then(function(href) {
            http.get(href, function(response) {

                var bodyString = '';
                response.setEncoding('utf8');
                response.on('data', function(chunk) {
                    bodyString += chunk;
                });
                response.on('end', function() {
                    deferred.resolve({
                        status: response.statusCode
                    });
                });
            }).on('error', function(e) {
                deferred.reject('Failed to get ' + href + ': ' + e.message);
            });
        });

    return deferred.promise;
};

module.exports = AccountPage;

