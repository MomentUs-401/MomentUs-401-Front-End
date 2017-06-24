'use strict';

require('./_dashboard.scss');

module.exports = [
  '$log',
  'memoryService',
  function($log, memoryService) {
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

      this.fetchMemories();
    };
  },
];
