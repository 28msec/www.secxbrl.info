'use script';

var minimist = require('minimist');

var knownOptions = {
  string: 'build-id',
  default: { 'build-id': process.env.RANDOM_ID }
};

var isOnTravis = process.env.TRAVIS_BUILD_ID !== undefined;
var isOnTravisAndMaster = isOnTravis && process.env.TRAVIS_BRANCH === 'master' && process.env.TRAVIS_PULL_REQUEST === 'false';
var buildId = minimist(process.argv.slice(2), knownOptions)['build-id'];
var bucketName = isOnTravisAndMaster ? 'app.secxbrl.info' : 'app.secxbrl.info-' + buildId;

module.exports = {
    isOnTravis: isOnTravis,
    isOnProduction: isOnTravisAndMaster,
    bucketName: bucketName,
    paths: {
        app: 'app',
        dist: 'dist',
        tmp: '.tmp',
        json: ['*.json'],
        js: ['app/**/*.js'],
        css: ['app/**/*.css'],
        index: 'app/*.html',
        html: ['app/**/*.html'],
        images: 'app/images/**/*.{gif,jpg,png}',
        svgs: 'app/images/**/*.svg',
        less: ['app/**/*.less'],
        fonts: ['app/**/*.ttf', 'app/**/*.woff'],
        tasks: ['gulpfile.js', 'tasks/*.js'],
        credentials: 'credentials.json',

        sitemap: 'app/sitemap.xml',
        robots: 'app/robots.txt'
    },
    credentials: {}
};
