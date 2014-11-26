'use strict';

angular.module('secxbrl')
    .directive('disqus', function($location){
        return function($scope, elm) {
            /*jshint camelcase: false */
            // http://docs.disqus.com/help/2/
            window.disqus_shortname = 'secxbrl';
            var disqusIdentifier = elm[0].getAttribute('disqus-identifier');
            window.disqus_identifier = disqusIdentifier ? disqusIdentifier : $location.path();
            window.disqus_url = 'https://app.secxbrl.info' + window.disqus_identifier;

            // window.disqus_developer = 1;
            // http://docs.disqus.com/developers/universal/

            if(!document.getElementById('disqusScript')) {
                var dsq = document.createElement('script');
                dsq.disqusScript = true;
                dsq.type = 'text/javascript';
                dsq.async = true;
                dsq.src = 'https://secxbrl.disqus.com/embed.js';
                document.getElementsByTagName('body')[0].appendChild(dsq);
            }
            angular.element(document.getElementById('disqus_thread')).html('');
        };
    })
    .directive('entry', function(){

        var loadContent = function($scope, elm) {
            if($scope.entries.length !== 1) {
                return;
            }
            var Sha1 = Sha1 || {};
            Array.prototype.forEach.call(elm, function(e, k) {
                if($scope.entries.length === 0) {
                    return;
                }
                var content = $scope.entries[k].content;
                e.innerHTML = content;
                Array.prototype.forEach.call(e.getElementsByClassName('wistia_embed'), function(embedE){
                    var id = embedE.getAttribute('id').substring(7);
                    var s = document.createElement('script');
                    s.charset = 'ISO-8859-1';
                    s.async = 'true';
                    s.type = 'text/javascript';
                    s.src = 'http://fast.wistia.com/embed/medias/' + id + '/metadata.js';
                    document.getElementsByTagName('body')[0].appendChild(s);
                    window.Wistia.embed(id);
                });
            });
        };

        return function($scope, elm){
            $scope.$watch('entries', function(){
                loadContent($scope, elm);
            });
        };
    })
    .controller('EntryCtrl', function($rootScope, $scope, $stateParams) {

        var load = function(){
            var entries = [];
            if($stateParams.id !== undefined) {
                var id = '/' + $stateParams.id + '/' + $stateParams.slug;
                $scope.index.entries.forEach(function(entry){
                    if(entry.id === id) {
                        entries.push(entry);
                    }
                });
            }
            $scope.entries = entries;
        };
        load();
    });
