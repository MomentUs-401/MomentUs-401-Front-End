'use strict';

require('./_map.scss');


module.exports = [
  '$log',
  '$location',
  '$rootScope',
  '$filter',
  'memoryService',
  'NgMap',
  function($log, $location, $rootScope, $filter, memoryService, NgMap) {
    this.$onInit = () => {
      $log.debug('Map Controller');
      $rootScope.googleMapsUrl = `https://maps.googleapis.com/maps/api/js?key=${__API_KEY__}`;

      let vm = this;
      vm.markers = [];

      vm.markerText;

      this.location = $location.search();


      NgMap.getMap()
      .then(function(map) {
        console.log(map);
        let x = map.customMarkers;
        Object.keys(x).forEach(ele => x[ele].visible = false)

        vm.showCustomMarker= function(evt, id) {
          console.log(id);
          map.customMarkers[id].setVisible(true);
          map.customMarkers[id].setPosition(this.getPosition());
        };
        vm.closeCustomMarker= function(evt) {
          this.style.display = 'none';
        };
      });



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
          .then(memories => {
            vm.markers = memories;
            vm.markers.forEach(e => {
              e.date = $filter('date')(e.date, 'longDate');
            })
          });
      };
      vm.fetchAllMemories();
    };
  },
];
