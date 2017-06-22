'use strict';

require('./_memory-item.scss');

module.exports = {
  template: require('./memory-item.html'),
  controllerAs: 'memoryItemCtrl',
  bindings: {
    memory: '<',
  },
  controller: ['$log', function($log) {
    this.$onInit = () => {
      $log.debug('Memory Item Controller');

      this.showEditMemory = false;

    };
  }],
};
