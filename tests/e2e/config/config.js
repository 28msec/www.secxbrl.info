'use strict';

var fs = require('fs');
var credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf-8'));

exports.config = {
    testUser: credentials['28'].user.login,
    testPassword: credentials['28'].user.password,
    environment: 'dev',
    e2eReportsDir: '/tmp/e2e-reports',
    allowRegistration: true
};
