'use strict';

require('./_map.scss');


module.exports = [
  '$log',
  '$location',
  '$rootScope',
  'memoryService',
  'NgMap',
  function($log, $location, $rootScope, memoryService, NgMap) {
    this.$onInit = () => {
      $log.debug('Map Controller');
      $rootScope.googleMapsUrl = `https://maps.googleapis.com/maps/api/js?key=${__API_KEY__}`;

      let vm = this;
      vm.markers = [];

      vm.types = ['geocode'];
      this.placeChanged = function() {
        vm.place = this.getPlace();
        vm.map.setCenter(vm.place.geometry.location);
      };
      NgMap.getMap().then(function(map) {
        vm.map = map;
      });
      vm.fetchAllMemories = () => {
        memoryService.fetchAllMemories()
          .then(markers => {
            vm.markers = markers;
            vm.icon = '../../../assets/lock-marker.png';
          });
      };
      vm.fetchAllMemories();
    };
  },
];
