'use script';

var isOnTravis = process.env.TRAVIS_BUILD_ID !== undefined;
var isOnTravisAndMaster = isOnTravis && process.env.TRAVIS_BRANCH === 'master' && process.env.TRAVIS_PULL_REQUEST === 'false';

module.exports = {
    isOnTravis: isOnTravis,
    isOnProduction: isOnTravisAndMaster,
    paths: {
        root: 'app',
        tmp: '.tmp',
        json: ['*.json'],
        js: ['gulpfile.js', 'app/**/*.js', '!app/lib/**/*.js'],
        index: 'app/*.html',
        html: ['app/**/*.html'],
        images: 'www/images/**/*',
        less: 'app/**/*.less',
        fonts: ['app/**/*.ttf', 'app/**/*.woff'],
        credentials: 'credentials.json',
        dist: 'dist/**/*'
    },
    credentials: {}
};
