'use strict';

module.exports = [
  '$stateProvider',
  '$urlServiceProvider',
  function($stateProvider, $urlServiceProvider) {
    $urlServiceProvider.rules.when('', '/join#signup');
    $urlServiceProvider.rules.when('/', '/join#signup');
    $urlServiceProvider.rules.when('/signup', '/join#signup');
    $urlServiceProvider.rules.when('/login', '/join#login');

    let routes = [
      {
        name: 'dashboard',
        url: '/dashboard',
        template: require('../view/dashboard/dashboard.html'),
        controller: 'DashboardController',
        controllerAs: 'dashboardCtrl',
      },
      {
        name: 'landing',
        url: '/join',
        template: require('../view/landing/landing.html'),
        controller: 'LandingController',
        controllerAs: 'landingCtrl',
      },
      {
        name: 'create',
        url: '/memory',
        template: require('../view/create/create.html'),
        controller: 'CreateController',
        controllerAs: 'createCtrl',
      },
      {
        name: 'map',
        url: '/map',
        template: require('../view/map/map.html'),
        controller: 'MapController',
        controllerAs: 'mapCtrl',
      },
    ];
    routes.forEach(route => $stateProvider.state(route));
  },
];
