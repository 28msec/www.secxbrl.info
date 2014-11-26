'use script';

var isOnTravis = process.env.TRAVIS_BUILD_ID !== undefined;
var isOnTravisAndMaster = isOnTravis && process.env.TRAVIS_BRANCH === 'master' && process.env.TRAVIS_PULL_REQUEST === 'false';

module.exports = {
    isOnTravis: isOnTravis,
    isOnProduction: isOnTravisAndMaster,
    paths: {
        json: ['*.json'],
        js: ['gulpfile.js', 'www/**/*.js', '!www/lib/**/*.js'],
        sass: ['./scss/**/*.scss'],
        credentials: 'credentials.json',
        dist: 'dist/**/*'
    },
    credentials: {

    }
};