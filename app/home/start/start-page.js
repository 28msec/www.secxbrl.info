/*global browser:false, element:false, by:false  */
'use strict';

var _ = require('lodash');

var AppPage = require('../../app-page.js').AppPage;

function StartPage(){
    AppPage.call(this);
    this.signUpButtons = element.all(by.css('.sign-up'));
    this.jumbotron =  element(by.css('.jumbotron'));
}
StartPage.prototype = _.create(AppPage.prototype);

StartPage.prototype.visitPage = function(){
    return browser.get('/');
};

module.exports = StartPage;


