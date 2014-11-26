/*global browser:false, element:false, by:false */
'use strict';

function StatsPage(){
    this.statsWidget = {};
    this.statsWidget.header = element(by.id('stats-widget-header'));
    this.statsWidget.details = element(by.id('stats-widget-details'));
}

StatsPage.prototype.visitPage = function(){
    return browser.get('/account/stats');
};

module.exports = StatsPage;


