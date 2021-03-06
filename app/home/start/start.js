'use strict';

angular.module('secxbrl')
.controller('StartCtrl', function($scope, $document){
    $scope.authenticated = false;

    $scope.goTo = function (eID){
        $document.scrollToElementAnimated(window.document.getElementById(eID), undefined, 1000);
    };

    $scope.parallax = function(elementPosition) {
        var result = {};
        if(elementPosition.scrollY > 0) {
            result.backgroundPosition = 'center ' + elementPosition.elemY/10 + 'px';
        }
        return result;
    };
});
