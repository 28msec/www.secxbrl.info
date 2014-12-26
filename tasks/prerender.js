'use strict';

var fs = require('fs');
var mkdirp = require('mkdirp');
var parse = require('xml-parser');
var request = require('request');
var _ = require('lodash');
var Q = require('q');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var jsdom = require('jsdom').jsdom;

var Config = require('./config');

var prerender = 'http://prerender28.herokuapp.com/';
var endpoint = 'http://' + Config.bucketName + '.s3-website-us-east-1.amazonaws.com';//'http://www.28.io';
//var isProduction = Config.isOnProduction;
var jsdomOpts = {
  FetchExternalResources: false,
  ProcessExternalResources: false,
  SkipExternalResources: true
};


gulp.task('prerender', function(){
  var tpl = fs.readFileSync('dist/index.html', 'utf-8');
  //if(isProduction === false) {
  //    return;
  //}
  var base = 'http://app.secxbrl.info';
  var urls = [];
  var xml = fs.readFileSync(Config.paths.sitemap, 'utf8');
  xml = parse(xml);
  xml.root.children.forEach(function(url){
    url.children.forEach(function(loc){
      urls.push(loc.content);
    });
  });

  var req = function(url, retry) {
    retry = retry ? retry : 0;
    var defered = Q.defer();
    var path = url.substring(base.length);
    var target = endpoint + path;
    var uri = prerender + encodeURI(target) + '/';
    request({
      uri: uri,
      method: 'GET'
    }, function(error, response, body){
      if(error) {
        defered.reject(error);
      }
      if(!_.isString(body) || body.indexOf('<article ') === -1) {
        if (retry < 10) {
          retry++;
          $.util.log($.util.colors.yellow('Retry ' + uri + ' ' + ' (' + (response ? response.statusCode : error) + ') ' + retry + ' times.'));
          req(url, retry).then(function (data) {
            defered.resolve(data);
          }).catch(function (error) {
            defered.reject(error);
          });
        } else {
          defered.reject('Couldn\'t get content for ' + uri + ' retried ' + retry + ' times. Got: ' + (response ? response.statusCode : error) + ' ' + body);
        }
      } else {
        defered.resolve({
          path: path,
          body: body
        });
      }
    });
    return defered.promise;
  };

  var write = function(data){
    var tplWindow = jsdom(tpl, null, jsdomOpts).parentWindow;
    var document = jsdom(data.body, null, jsdomOpts);
    var destDir = 'dist' + data.path;
    var window = document.parentWindow;
    var article = window.document.querySelector('article');
    if(article) {
      $.util.log($.util.colors.green('write ' + destDir + '/index.html'));
      tplWindow.document.querySelector('article').innerHTML = article.innerHTML;
      var serialized = '<!doctype html>' + tplWindow.document.documentElement.outerHTML;
      mkdirp.sync(destDir);
      fs.writeFileSync('dist' + data.path + '/index.html', serialized, 'utf-8');
    } else {
      console.log($.util.colors.red('ERROR: ' + JSON.stringify(data, null, 2)));
      throw new Error(data.path + ' ' + data.body);
    }
    window.close();
    tplWindow.close();
  };

  return _.chain(urls)
    .sortBy()
    .reduce(function(acc, next){
      var last = acc[acc.length - 1];
      if(last.length > 10){
        acc.push([]);
        last = acc[acc.length - 1];
      }
      last.push(next);
      return acc;
    }, [[]])
    .reduce(function(prev, next){
      return prev.then(function(){
        var promises = _.chain(next).map(function(p){ return req(p); }).value();
        return Q.all(promises).then(function(result){
          result.forEach(function(data){
            write(data);
          });
        });
      });
    }, Q.resolve()).value();
});
