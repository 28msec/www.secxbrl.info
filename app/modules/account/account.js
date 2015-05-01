'use strict';

angular
  .module('secxbrl')
  .directive('account', function(){
    return {
      restrict: 'E',
      templateUrl: '/modules/account/account.html',
      replace: true,
    };
  });
