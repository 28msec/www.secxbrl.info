/*global browser:false  */
'use strict';


function AppPage(){

}

AppPage.prototype.getTitle = function(){
    return browser.getTitle();
};

AppPage.prototype.getCurrentUrl = function(){
    return browser.getCurrentUrl();
};

exports.AppPage = AppPage;
