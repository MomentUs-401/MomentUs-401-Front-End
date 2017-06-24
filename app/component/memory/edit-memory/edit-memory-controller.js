'use strict';

require('./_edit-memory.scss');

module.exports = {
  template: require('./edit-memory.html'),
  controllerAs: 'editMemoryCtrl',
  bindings: {
    memory: '<',
  },
  controller: ['$log', 'memoryService', function($log, memoryService) {

    this.$onInit = () => {
      $log.debug('Edit Memory Controller');
      this.memoryUpdate = {};

      this.updateMemory = () => {
        if(this.memoryUpdate.date === null) delete this.memoryUpdate.date;
        return memoryService.updateMemory(this.memoryUpdate, this.memory._id);
      };
    };
  }],
};
