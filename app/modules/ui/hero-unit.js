'use strict';

angular
.module('secxbrl')
.directive('heroUnit', function($window, $rootScope){

    var onScroll = function(event, toState) {
        var top = document.body.getBoundingClientRect().top;
        if(top >= 0 && ((document.getElementById('home') !== null && !toState) || (toState && toState.name === 'home.start'))) {
            document.querySelector('nav.navbar').classList.add('transparent');
        } else {
            document.querySelector('nav.navbar').classList.remove('transparent');
        }
    };

    return function($scope, $element){
        angular.element($window).bind('scroll', onScroll);
        onScroll();
        $rootScope.$on('$stateChangeSuccess', onScroll);

        var w = angular.element($window);

        $scope.getWindowDimensions = function () {
            var a = $window.document.documentElement.clientHeight;
            var b = $window.innerHeight;
            return a < b ? b : a;
        };

        $scope.$watch($scope.getWindowDimensions, function (newValue) {
            var title = document.querySelector('.title');
            var titleH = title.getBoundingClientRect().height;
            var val = ((newValue - titleH) / 2);
            if(val > 50) {
                title.style.marginTop = val + 'px';
            }
            if(newValue > (titleH + 50)) {
                $element[0].style.height = newValue + 'px';
            }

        });

        w.bind('resize', function () {
            $scope.$apply();
        });


    };
})
;

