#www.secxbrl.info
[![Circle CI](https://circleci.com/gh/28msec/www.secxbrl.info.svg?style=svg)](https://circleci.com/gh/28msec/www.secxbrl.info)

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
