'use strict';

const expect = require('chai').expect;

describe('Testing the Signup Controller', function() {
  beforeEach(() => {
    angular.mock.module('momentus');
    angular.mock.inject(($rootScope, $componentController, $window, $httpBackend, authService) => {
      this.$rootScope = $rootScope;
      this.$window = $window;
      this.$httpBackend = $httpBackend;
      this.authService = authService;
      this.signupCtrl = $componentController('signupController');
    });
  });
  
  beforeEach(() => {
    this.signupCtrl.$onInit();
  });
  
  afterEach(() => {
    this.$window.localStorage.removeItem('token');
  });
  
  describe('Testing the initial properties', () => {
    it('should have a title property', () => {
      expect(this.signupCtrl.title).to.equal('Please Sign In');
      expect(this.signupCtrl.title).to.be.a('string');
    });
  });
  
  describe('Testing the signup method', () => {
    it('should make a valid POST request to sign up', () => {
      this.$window.localStorage.token = null;
      
      let expectUser = {
        username: 'user 1',
        email: 'test@test.com',
        password: 'password',
      };
      
      let expectUrl = 'https://momentus-backend1.herokuapp.com/api/memory';
      
      let expectConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      };
      
      this.$httpBackend.whenPOST(expectUrl, expectUser, expectConfig).respond(200, 'user token');
      
      this.signupCtrl.signup(expectUser).then(() => {
        expect(this.$window.localStorage.token).to.equal('user token');
        this.$httpBackend.flush();
        this.$rootScope.$apply();
      });
    });
  });
});