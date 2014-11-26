'use strict';

angular.module('secxbrl')
    .controller('LogoutCtrl', function(Session, $state) {
        Session.logout();
        $state.go('home.start', { }, { reload: true });
    });