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
    this.$onInit = () => {
      $log.debug('Map Controller');
      NgMap.getMap().then(function(map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
      });
    };
  },
];
