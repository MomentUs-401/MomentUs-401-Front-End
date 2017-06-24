'use strict';

const expect = require('chai').expect;

describe('Testing the Create Memory Controller', function() {
  beforeEach(done => {
    angular.mock.module('momentus');
    angular.mock.inject(($rootScope, $httpBackend, $window, $componentController) => {
      this.$rootScope = $rootScope;
      this.$httpBackend = $httpBackend;
      this.$window = $window;
      this.$componentController = $componentController;
      this.createMemoryCtrl = $componentController('createMemoryController');
      done();
    });
  });
  
  beforeEach(done => {
    this.createMemoryCtrl.$onInit();
    this.$window.localStorage.setItem('token', 'test token');
    done();
  });
  
  describe('Testing the createMemory method', () => {
    it('should make a valid POST request to create a new memory', done => {
      let expectUrl = `${__API_URL__}/api/memory`;

      let expectHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.$window.localStorage.token}`,
      };
      
      let expectMemory = {
        title: 'Final Project Week',
        date: '06/20/2017',
        location: {
          lat: 1,
          lng: 1,
        },
        description: 'Creating Momentus',
        songTitle: 'Hello Seattle by Owl City',
        photo: {
          imageURI: 'https://lab-18.s3.amazonaws.com/14d59438798bfc18b7c268e9228c1384.png',
          ObjectId: '14d59438798bfc18b7c268e9228c1384.png',
        },
        friends: 'Abbi White, Allie Grampa, Steven Johnson, David Wheeler, Shelly Tang',
      };

      this.$httpBackend.expectPOST(expectUrl, expectMemory, expectHeaders).respond(200, expectMemory);
      
      this.createMemoryCtrl.memory = expectMemory;
      
      expect(this.createMemoryCtrl.createMemory).to.not.throw();

      done();
    });
  });
});