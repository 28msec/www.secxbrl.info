'use strict';

describe('Private Account Stats Page', function(){

    var HomePage = require('../../app/home/home-page');
    var home = new HomePage();
    var stats = home.account.stats;

    it('should display stats', function() {
        stats.visitPage();
        expect(stats.statsWidget.header.getText()).toBe('API calls in current period');
        expect(stats.statsWidget.details.getText()).toBeDefined();
    });

});