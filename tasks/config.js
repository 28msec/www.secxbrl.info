'use script';

var isOnTravis = process.env.TRAVIS_BUILD_ID !== undefined;
var isOnTravisAndMaster = isOnTravis && process.env.TRAVIS_BRANCH === 'master' && process.env.TRAVIS_PULL_REQUEST === 'false';

module.exports = {
    isOnTravis: isOnTravis,
    isOnProduction: isOnTravisAndMaster,
    paths: {
        app: 'app',
        dist: 'dist',
        tmp: '.tmp',
        json: ['*.json'],
        js: ['app/**/*.js', '!app/lib/**/*.js'],
        index: 'app/*.html',
        html: ['app/**/*.html'],
        images: 'app/images/**/*.{gif,jpg,png}',
        svgs: 'app/images/**/*.svg',
        less: 'app/**/*.less',
        fonts: ['app/**/*.ttf', 'app/**/*.woff'],
        tasks: ['gulpfile.js', 'tasks/*.js'],
        credentials: 'credentials.json'
    },
    credentials: {}
};
