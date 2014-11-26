'use strict';

var config = require('./protractor-shared-conf').config;

config.capabilities = {
    browserName: 'chrome',
};

exports.config = config;
