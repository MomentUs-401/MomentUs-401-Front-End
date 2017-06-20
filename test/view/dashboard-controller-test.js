'use strict';

const expect = require('chai').expect;

describe('Testing the Dashboard Controller', function() {
  beforeEach(() => {
    angular.mock.module('momentus');
    angular.mock.inject(($rootScope, $controller, $window, $httpBackend, memoryService) => {
      this.$rootScope = $rootScope;
      this.$window = $window;
      this.$httpBackend = $httpBackend;
      this.dashboardCtrl = new $controller('DashboardController');
      this.memoryService = memoryService;
      this.$window.localStorage.setItem('token', 'test token');
    });
  });
  
  afterEach(() => {
    this.$window.localStorage.removeItem('token');
  });
  
  describe('Testing the initial properties', () => {
    beforeEach(() => {
      this.dashboardCtrl.$onInit();
    });
    
    it('should have a title property', () => {
      expect(this.dashboardCtrl.title).to.equal('Make Memories with MomentUs');
      expect(this.dashboardCtrl.title).to.be.a('string');
    });
    
    it('should have an empty memories array', () => {
      expect(this.dashboardCtrl.memories).to.equal([]);
      expect(this.dashboardCtrl.memories).to.be.an('array');
      expect(this.dashboardCtrl.memories).to.be.empty;
    });
  });
  
  describe('Testing the fetchMemories method', () => {
    beforeEach(() => {
      this.expectUrl = 'https://momentus-backend1.herokuapp.com/api/memory';
      
      this.expectHeaders = {
        'Accept': 'application/json',
        Authorization: `Bearer ${this.$window.localStorage.token}`,
      };
      
      this.dashboardCtrl.$onInit();
    });
    
    afterEach(() => {
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
    
    this.expectMemories = [
      {
        title: 'Final Project Week',
        description: 'Creating Momentus',
        date: '06/20/2017',
        song: 'Hello Seattle by Owl City',
        friends: 'Abbi White, Allie Grampa, Steven Johnson, David Wheeler, Shelly Tang',
      },
      {
        title: 'Code Fellows',
        description: 'Hackerz',
        date: '06/21/2017',
        song: 'Sup Slugs',
        friends: 'Scott Schmidt and Duncan Marsh',
      },
    ];
    
    it('should make a valid GET request', () => {
      this.$httpBackend.expectGET(this.expectUrl, this.expectHeaders).respond(200);
      // should not need this line because of the beforeEach
      // this.dashboardCtrl.$onInit();
    });
    
    it('should retrieve the user\'s memories', () => {
      this.$httpBackend.whenGET(this.expectUrl, this.expectHeaders).respond(200, this.expectMemories);
      // should not need this line because of the beforeEach
      // this.dashboardCtrl.$onInit();
    });
  });
});