/*global browser:false */
'use strict';

function LogoutPage(){}

LogoutPage.prototype.visitPage = function(){
    return browser.get('/auth/logout');
};

module.exports = LogoutPage;
