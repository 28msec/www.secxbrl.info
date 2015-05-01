'use strict';

angular.module('contact-us', [])
  .directive('contact', function(){
    return {
      restrict: 'A',
      link: function($scope, $element){
        $element.on('click', function(){
          window.Intercom('show');
        });
      }
    };
  });
