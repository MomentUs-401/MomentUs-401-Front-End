'use strict';

const expect = require('chai').expect;

describe('Auth Service test', function() {
  beforeEach(() => {
    angular.mock.module('momentus');
    angular.mock.inject(($httpBackend, $window, $rootScope, authService) => {
      this.$httpBackend = $httpBackend;
      this.$window = $window;
      this.$rootScope = $rootScope;
      this.authService = authService;
    });
  });
  
  describe('Testing the getToken method', () => {
    it('should return a token', () => {
      this.authService.token = null;
      this.$window.localStorage.setItem('token', 'test token');
      
      this.authService.getToken()
      .then(token => {
        expect(token).to.equal(this.$window.localStorage.token);
      })
      .catch(err => {
        expect(err).to.be.null;
      });
    });
  });
  
});