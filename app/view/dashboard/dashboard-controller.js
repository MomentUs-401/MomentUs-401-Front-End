'use strict';

require('./_dashboard.scss');

module.exports = [
  '$log',
  '$rootScope',
  'memoryService',
  function($log, $rootScope, memoryService) {
    this.$onInit = () => {
      $log.debug('Dashboard Controller');
      
      this.title = 'Make Memories with MomentUs';
      
      this.memories = [];
      
      this.fetchMemories = () => {
        return memoryService.fetchMemories()
        .then(memories => {
          this.memories = memories;
          this.currentMemory = this.memories[0];
        })
        .catch(err => $log.error(err));
      };
      
      $rootScope.$on('locationChangeSuccess', this.fetchMemories);
      $rootScope.$on('newMemoryCreation', this.fetchMemories);
      
      this.fetchMemories();
    };
  },
];