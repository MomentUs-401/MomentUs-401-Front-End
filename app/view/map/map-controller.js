'use strict';

// require(./_map.scss);
// const location = require('./');
// const map = require('ngmap');


module.exports = [
  '$log',
  '$location',
  '$scope',
  'NgMap',
  function($log, $location, $scope, NgMap) {
    $scope.googleMapsUrl = `https://maps.googleapis.com/maps/api/js?key=${__API_KEY__}`;
    this.$onInit = () => {
      $log.debug('Map Controller');
      NgMap.getMap().then(function(map) {
        
      });
    };
  },
];
