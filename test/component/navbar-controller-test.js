'use strict';

const expect = require('chai').expect;

describe('Testing the Navigation Bar Controller', function () {
  beforeEach(done => {
    angular.mock.module('momentus');
    angular.mock.inject(($rootScope, $componentController, $location, $window, authService) => {
      this.$rootScope = $rootScope;
      this.$scope = this.$rootScope.$new();
      this.$window = $window;
      this.$location = $location;
      this.authService = authService;
      this.$componentController = $componentController;
      this.$window.localStorate.setItem('token', 'test token');
      
      this.navbarCtrl = this.$componentController('navbarController',
        {
          scope: this.$scope,
          authService: this.authService,
        }
      );
      
      this.navbarCtrl.$onInit();
    });
    done();
  });
  
  afterEach(done => {
    this.$rootScope.$apply();
    this.$window.localStorage.removeItem('token');
    done();
  });
  
  it('should have a method to check the path', done => {
    expect(this.navbarCtrl).to.be.a('function');
    done();
  });
  
  it('should have a method for the user to log out', done => {
    expect(this.navbarCtrl.logout).to.be.a('function');
    done();
  });
});