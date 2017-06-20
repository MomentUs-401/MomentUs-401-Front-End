'use strict';

const expect = require('chai').expect;

describe('Testing the Create Memory Controller', function() {
  beforeEach(done => {
    angular.mock.module('momentus');
    angular.mock.inject(($rootScope, $httpBackend, $window, $componentController) => {
      this.$rootScope = $rootScope;
      this.$httpBackend - $httpBackend;
      this.$window = $window;
      this.$componentController = $componentController;
      this.createMemoryCtrl = $componentController('CreateMemoryController');
    });
    done();
  });
  
  beforeEach(done => {
    this.createMemoryCtrl.$onInit();
    this.$window.localStorage.setItem('token', 'test token');
    done();
  });
  
  afterEach(done => {
    this.$window.localStorage.removeItem('token');
    this.$httpBackend.flush();
    this.$rootScope.$apply();
    done();
  });
  
  describe('Testing the createMemory method', () => {
    it('should make a valid POST request to create a new memory', done => {
      let expectUrl = 'https://momentus-backend1.herokuapp.com/api/memory';

      let expectHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.$window.localStorage.token}`,
      };
      
      let expectMemory = {
        title: 'Final Project Week',
        description: 'Creating Momentus',
        date: '06/20/2017',
        song: 'Hello Seattle by Owl City',
        friends: 'Abbi White, Allie Grampa, Steven Johnson, David Wheeler, Shelly Tang',
      };

      this.$httpBackend.expectPOST(expectUrl, expectMemory, expectHeaders).respond(200, expectMemory);
      
      this.createMemoryCtrl.memory = expectMemory;
      
      expect(this.createMemoryCtrl.createMemory).to.not.throw();

      done();
    });
  });
});