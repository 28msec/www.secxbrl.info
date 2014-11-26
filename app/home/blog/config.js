'use strict';

angular
.module('secxbrl')
.config(function ($stateProvider) {
    $stateProvider
    .state('home.blog', {
        url: '/blog',
        templateUrl: '/home/blog/blog.html',
        controller: 'BlogCtrl',
        abstract: true,
        resolve: {
            blogIndex: ['BlogAPI', function(BlogAPI) {
                return BlogAPI.getIndex();
            }]
        }
    });
})
;
