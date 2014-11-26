/*global browser:false, element:false, by:false  */
'use strict';

var _ = require('lodash');

var AppPage = require('../../app-page.js').AppPage;

function APIPage(){
    AppPage.call(this);
    this.description = element(by.id('description'));
    this.apiLinks =  element.all(by.repeater('a in content.apis'));
    this.apiDetails =  element.all(by.repeater('api in content.apis'));
}
APIPage.prototype = _.create(AppPage.prototype);

APIPage.prototype.visitPage = function(){
    return browser.get('/api');
};

module.exports = APIPage;


