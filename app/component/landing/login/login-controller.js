'use strict';

require('./_login.scss');

module.exports = {
  template: require('./login.html'),
  controllerAs: 'loginCtrl',
  controller: [
    '$log',
    '$location',
    '$window',
    'authService',
    function($log, $location, $window, authService) {
      this.$onInit = () => {
        $log.debug('loginCtrl');

        if(!$window.localStorage.token) {
          authService.getToken()
          .then(
            () => $location.url('/dashboard'),
            () => $location.url('/signup')
          );
        }

        this.login = function() {
          $log.debug('loginCtrl.login()');

          authService.login(this.user)
          .then(() => $location.url('/dashboard'));

        };
      };
    },
  ],
};
