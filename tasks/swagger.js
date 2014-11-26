'use strict';

var fs = require('fs');
var gulp = require('gulp');

gulp.task('swagger', function(done){
    var request = require('request');
    var Q = require('q');
    var CodeGen = require('swagger-js-codegen').CodeGen;
    var apis = [
        {
            swagger: 'https://raw.githubusercontent.com/28msec/secxbrl.info/master/swagger/queries.json',
            moduleName: 'queries',
            className: 'QueriesAPI'
        }, {
            swagger: 'https://raw.githubusercontent.com/28msec/secxbrl.info/master/swagger/session.json',
            moduleName: 'session',
            className: 'SessionAPI'
        }, {
            swagger: 'https://raw.githubusercontent.com/28msec/secxbrl.info/master/swagger/reports.json',
            moduleName: 'reports',
            className: 'ReportsAPI'
        }
    ];
    var dest = 'www/modules';
    var promises = [];
    apis.forEach(function(api){
        var deferred = Q.defer();
        request({
            uri: api.swagger,
            method: 'GET'
        }, function(error, response, body){
            if(error || response.statusCode !== 200) {
                deferred.reject('Error while fetching ' + api.swagger + ': ' + (error || body));
            } else {
                var swagger = JSON.parse(body);
                var source = CodeGen.getAngularCode({ moduleName: api.moduleName, className: api.className, swagger: swagger });
                console.log('Generated ' + api.moduleName + '-api.js from ' + api.swagger);
                fs.writeFileSync(dest + '/' + api.moduleName + '-api.js', source, 'UTF-8');
                deferred.resolve();
            }
        });
        promises.push(deferred.promise);
    });
    Q.all(promises).then(function(){
        done();
    }).catch(function(error){
        console.error(error);
        process.exit(1);
    });
});