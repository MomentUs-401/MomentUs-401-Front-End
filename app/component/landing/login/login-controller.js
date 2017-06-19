'use strict';

require('./_login.scss');

module.exports = {
  template: require('./login.html'),
  controllerAs: 'loginCtrl',
  controller: [
    '$log',
    '$location',
    'authService',
    function($log, $location, authService) {
      this.$onInit = () => {
        $log.debug('loginCtrl');
        
        authService.getToken()
        .then(() => $location.url('/dashboard'));
        
        this.login = function() {
          $log.debug('loginCtrl.login');
          
          return authService.lovin(this.user)
          .then(() => $location.url('./dashboard'));
        };
      };
    },
  ],
};