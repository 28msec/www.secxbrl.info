#www.secxbrl.info
[![Build Status](http://img.shields.io/travis/28msec/www.secxbrl.info/master.svg?style=flat)](https://travis-ci.org/28msec/www.secxbrl.info) [![Code Climate](http://img.shields.io/codeclimate/github/28msec/www.secxbrl.info.svg?style=flat)](https://codeclimate.com/github/28msec/www.secxbrl.info)

##Prerequisites
You need to have gulp installed:
```bash
$ npm install --global gulp
```

##Development
Install dependencies:
```bash
$ npm install && bower install
```
Configuration (openssl needed):
```bash
$ export TRAVIS_SECRET_KEY=secret
$ gulp server
```

##Test
```bash
$ gulp test
```

##Deployment
```bash
$ gulp setup --build-id=deployment-name
```
