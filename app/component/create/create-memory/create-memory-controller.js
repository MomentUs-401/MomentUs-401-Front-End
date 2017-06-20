'use strict';

require('./_create-memory.scss');

module.exports = {
  template: require('./create-memory.html'),
  controllerAs: 'createMemoryCtrl',
  controller: ['$log', '$rootScope', 'memoryService', function($log, $rootScope, memoryService) {

    this.$onInit = () => {

      $log.debug('CreateMemoryController');
      this.memory = {};

      this.createMemory = () => {
        console.log('what', this.memory);
        return memoryService.createMemory(this.memory)
        .then(() => {
          let res = this.memory;
          this.memory.title = null;
          this.memory.location = null;
          this.memory.date = null;
          this.memory.description = null;
          this.memory.songTitle = null;
          this.memory.friends = null;

          $rootScope.$emit('newMemoryCreated');
          return res;
        })
        .catch(err => $log.error(err));
      };
    };
  }],
};
