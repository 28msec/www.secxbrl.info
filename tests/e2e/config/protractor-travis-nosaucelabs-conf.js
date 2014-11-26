'use strict';

var config = require('./protractor-shared-conf').config;

config.capabilities = {
    browserName: 'firefox',
    version: '28'
};

exports.config = config;
