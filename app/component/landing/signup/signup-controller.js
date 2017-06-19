'use strict';

module.exports = {
  template: require('./signup.html'),
  controllerAs: 'signupCtrl',
  controller: [
    '$log',
    '$location',
    'authService',
    function($log, $location, authService) {
      this.$onInit = () => {
        $log.debug('Signup Controller');
        
        this.title = 'Please Sign In';
        
        this.signup = function(user) {
          $log.debug('signupCtrl.signup');
          
          return authService.signup(user)
          .then(() => $location.url('/dashboard'));
        };
      };
    },
  ],
};