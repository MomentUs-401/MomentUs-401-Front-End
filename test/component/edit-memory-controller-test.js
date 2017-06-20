'use strict';

const expect = require('chai').expect;

describe('Testing the Edit Memory Component', function() {
  beforeEach(done => {
    angular.mock.module('momentus');
    angular.mock.inject(($rootScope, $httpBackend, $window, $componentController, authService) => {
      this.$rootScope = $rootScope;
      this.$httpBackend = $httpBackend;
      this.$window = $window;
      this.$componentController = $componentController;
      this.authService = authService;
      this.editMemoryCtrl = $componentController('editMemoryController');
      done();
    });
  });
  
  beforeEach(done => {
    this.editMemoryCtrl.$onInit();
    this.$window.localStorage.setItem('token', 'test token');
    done();
  });
  
  describe('Testing the updateMemory method', () => {
    it('should create a mock gallery', done => {
      let mockBindings = {
        memory: {
          title: 'Final Project Week',
          description: 'Creating Momentus',
          date: '06/20/2017',
          song: 'Hello Seattle by Owl City',
          friends: 'Abbi White, Allie Grampa, Steven Johnson, David Wheeler, Shelly Tang',
          _id: '123',
        },
        updateMemory: function(memory) {
          expect(memory.title).to.equal('Final Project Week');
          expect(memory.description).to.equal('Creating Momentus');
          expect(memory.date).to.equal('06/20/2017');
          expect(memory.song).to.equal('Hello Seattle by Owl City');
          expect(memory.friends).to.equal('Abbi White, Allie Grampa, Steven Johnson, David Wheeler, Shelly Tang');
          expect(memory._id).to.equal('123');
        },
      };
      done();
    });
    
    it('should update the gallery', done => {
      let expectUrl = `${__API_URL__}/api/memory`;

      let expectHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.$window.localStorage.token}`,
      };
      
      let mockBindings = {
        memory: {
          title: 'Final Project Week',
          description: 'Creating Momentus',
          date: '06/20/2017',
          song: 'Hello Seattle by Owl City',
          friends: 'Abbi White, Allie Grampa, Steven Johnson, David Wheeler, Shelly Tang',
          _id: '123',
        },
      };
      
      let mockUpdate = {
        memory: {
          title: 'Code Fellows',
          description: 'Hackerz',
          date: '06/21/2017',
          song: 'Sup Slugs',
          friends: 'Scott Schmidt and Duncan Marsh',
        },
      };
      
      this.$rootScope.$apply();
      
      this.$httpBackend.whenPUT(expectUrl, mockUpdate, expectHeaders).respond(200);
      
      expect(this.editMemoryCtrl.updateMemory).to.not.throw();
      // try using ".to.be" in expect statements if the tests below are failing
      expect(this.editMemoryCtrl.memory.title).to.equal('Code Fellows');
      expect(this.editMemoryCtrl.memory.description).to.equal('Hackerz');
      expect(this.editMemoryCtrl.memory.date).to.equal('06/21/2017');
      expect(this.editMemoryCtrl.memory.song).to.equal('Sup Slugs');
      expect(this.editMemoryCtrl.memory.friends).to.equal('Scott Schmidt and Duncan Marsh');
      done();
    });
  });
});