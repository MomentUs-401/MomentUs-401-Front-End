'use strict';

const expect = require('chai').expect;

describe('Testing the Delete Memory Controller', function () {
  beforeEach(done => {
    angular.mock.module('momentus');
    angular.mock.inject(($rootScope, $httpBackend, $window, $componentController, authService) => {
      this.$rootScope = $rootScope;
      this.$httpBackend = $httpBackend;
      this.$window = $window;
      this.$componentController = $componentController;
      this.authService = authService;
      this.deleteMemoryCtrl = $componentController('deleteMemoryController');
      done();
    });
  });
  
  beforeEach(done => {
    this.deleteMemoryCtrl.$onInit();
    this.$window.localStorage.setItem('token', 'test token');
    done();
  });
  
  
  describe('Testing the deleteMemory method', () => {
    
    it('should call the delete method', done => {
      let mockBindings = {
        memory: {
          title: 'Final Project Week',
          description: 'Creating Momentus',
          date: '06/20/2017',
          song: 'Hello Seattle by Owl City',
          friends: 'Abbi White, Allie Grampa, Steven Johnson, David Wheeler, Shelly Tang',
          _id: '123',
        },
        deleteMemory: function(memory) {
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
    
    it('should delete the memory', done => {
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
      
      this.$rootScope.$apply();
      
      this.$httpBackend.whenDELETE(expectUrl, expectHeaders).respond(204);
      
      this.deleteMemoryCtrl.memory = mockBindings.memory;
      
      expect(this.deleteMemoryCtrl.deleteMemory).to.not.throw();
      done();
    });
  });
});