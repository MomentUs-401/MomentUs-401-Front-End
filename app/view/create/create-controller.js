'use strict';

module.exports = [
  '$log',
  function($log) {
    this.$onInit = () => {
      $log.debug('CreateController()');
    };
  },
];
