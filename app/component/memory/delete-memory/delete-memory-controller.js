'use strict';

// require('./_delete-memory.scss');

module.exports = {
  template: require('./delete-memory.html'),
  controllerAs: 'deleteMemoryCtrl',
  bindings: {
    memory: '<',
  },
  controller: ['$log', 'memoryService', function($log, memoryService) {
    this.$onInit = () => {
      $log.debug('Delete Memory Controller');
      this.deleteMemory = () => {
        memoryService.deleteMemory(this.memory._id);
      };
    };
  }],
};
