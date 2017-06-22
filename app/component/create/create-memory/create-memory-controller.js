'use strict';

require('./_create-memory.scss');

module.exports = {
  template: require('./create-memory.html'),
  controllerAs: 'createMemoryCtrl',
  controller: ['$log', '$rootScope', 'memoryService', 'NgMap', '$location', function($log, $rootScope, memoryService, NgMap, $location) {

    this.$onInit = () => {
      $log.debug('CreateMemoryController');
      this.memory = {};
      this.memoryLoc = {
        lat: null,
        lng: null,
      };

      let vm = this;

      vm.types = ['geocode'];
      this.placeChanged = function() {
        vm.place = this.getPlace();
        vm.memoryLoc.lat = vm.place.geometry.location.lat();
        vm.memoryLoc.lng = vm.place.geometry.location.lng();
        vm.map.setCenter(vm.place.geometry.location);
      };
      NgMap.getMap().then(map => {
        vm.map = map;
      });

      this.createMemory = () => {
        this.memory.location = null;
        this.memory.location = this.memoryLoc;
        return memoryService.createMemory(this.memory)
        .then(() => {
          let res = this.memory;
          this.memory.title = null;
          this.memory.location = null;
          this.memory.date = null;
          this.memory.description = null;
          this.memory.songTitle = null;
          this.memory.friends = null;
          this.memory.photo = null;

          $rootScope.$emit('newMemoryCreated');
          return res;
        })
        .then(() => $location.url('/dashboard'))
        .catch(err => $log.error(err));
      };
    };
  }],
};
