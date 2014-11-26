'use script';

var isOnTravis = process.env.TRAVIS_BUILD_ID !== undefined;
var isOnTravisAndMaster = isOnTravis && process.env.TRAVIS_BRANCH === 'master' && process.env.TRAVIS_PULL_REQUEST === 'false';

module.exports = {
    isOnTravis: isOnTravis,
    isOnProduction: isOnTravisAndMaster,
    paths: {
        json: ['*.json'],
        js: ['gulpfile.js', 'app/**/*.js', '!app/lib/**/*.js'],
        html: ['app/**/*.html'],
        fonts: ['app/**/*.ttf', 'app/**/*.woff'],
        credentials: 'credentials.json',
        dist: 'dist/**/*'
    },
    credentials: {

    }
};
