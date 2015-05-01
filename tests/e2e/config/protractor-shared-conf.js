/*global browser:false */
'use strict';

var HtmlReporter = require('protractor-html-screenshot-reporter');

exports.config = {
    allScriptsTimeout: 30000,

    baseUrl: 'http://localhost:9000',

    framework: 'jasmine',

    specs: ['../*-scenario.js'],

    onPrepare: function() {
        // Disable animations so e2e tests run more quickly
        var disableNgAnimate = function() {
            angular.module('disableNgAnimate', []).run(function($animate) {
                $animate.enabled(false);
            });
        };

        browser.addMockModule('disableNgAnimate', disableNgAnimate);

        // Store the name of the browser that's currently being used.
        browser.getCapabilities().then(function(caps) {
            browser.params.browser = caps.get('browserName');
        });

        if(config.environment === 'ci' || config.environment === 'prod') {
            // Add a screenshot reporter and store screenshots to config.e2eReportsDir:
            jasmine.getEnv().addReporter(new HtmlReporter({
                baseDirectory: config.e2eReportsDir
            }));
        }
    },

    jasmineNodeOpts: {
        defaultTimeoutInterval: 100000
    }
};
