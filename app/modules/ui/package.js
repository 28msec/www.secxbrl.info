'use strict';

angular
.module('secxbrl')
.directive('package', function($log){
    return {
        restrict: 'E',
        templateUrl: '/modules/ui/package.html',
        replace: true,
        scope: {
            'id': '@',
            'offset': '@',
            'buttonclass': '@',
            'buttonhref': '@',
            'buttontext': '@',
            'align': '@'
        },
        link: function($scope){
            var freePackage = {
                name: 'Free',
                symbol: 'plane',
                description: 'For Non-Commercial Projects',
                includes: [
                    'Access to all SEC filings', 'UI access', 'API access',
                    null, null, null, null,
                    null, null, null, null,
                    null
                ]
            };
            var enterprisePackage = {
                name: 'Enterprise',
                symbol: 'rocket',
                description: 'Tailored to your needs',
                includes: [
                    'Access to all SEC filings', 'UI access', 'API access',
                    null, 'Unlimited API calls', 'Unlimited Users', 'Your domain &amp; your SSL certificate',
                    'Adapt API for your sophisticated queries', 'Scalable processing power', 'Bring your own filings', 'Custom Reports',
                    'Support'
                ]
            };
            $scope.colClass = function(offset) {
                var result = [];
                if (offset) {
                    result.push('col-sm-offset-' + offset);
                }
                if($scope.align === undefined || $scope.align === 'horizontal'){
                    result.push('col-sm-4');
                } else if($scope.align === 'vertical') {
                    result.push('col-sm-12');
                }
                return result;
            };
            if($scope.id === 'free'){
                $scope.package = freePackage;
            } else if($scope.id === 'enterprise') {
                $scope.package = enterprisePackage;
            } else {
                $log.error('unknown package: ' + $scope.id);
            }
        }
    };
});