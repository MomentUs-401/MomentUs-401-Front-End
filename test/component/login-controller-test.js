'use strict';

const expect = require('chai').expect;

describe('Testing the Login Controller', function() {
  beforeEach(done => {
    angular.mock.module('momentus');
    angular.mock.inject(($rootScope, $componentController, $window, $httpBackend, authService) => {
      this.$rootScope = $rootScope;
      this.$window = $window;
      this.$httpBackend = $httpBackend;
      this.authService = authService;
      this.loginCtrl = $componentController('loginController');
    });
    done();
  });
  
  beforeEach(done => {
    this.loginCtrl.$onInit();
    this.$window.localStorage.setItem('token', 'test token');
    done();
  });
  
  afterEach(done => {
    this.$window.localStorage.removeItem('token');
    done();
  });
  
  describe('Testing the login method', () => {
    it('should make a valid GET request to log in', done => {
      let expectUser = {
        username: 'user 1',
        email: 'test@test.com',
        password: 'password',
      };
      
      let expectUrl = 'https://momentus-backend1.herokuapp.com/api/memory';

      let base64 = this.$window.btoa(`${expectUser.username}:${expectUser.password}`);
      
      let expectConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Basie ${base64}`,
        },
      };
      
      this.loginCtrl.user = expectUser;
      
      this.$httpBackend.expectGET(expectUrl, expectUser, expectConfig).respond(200, 'user token');
      
      this.loginCtrl.login().then(() => {
        expect(this.$window.localStorage.token).to.equal('user token');
        
        this.$httpBackend.flush();
        this.$rootScope.$apply();
      });
      done();
    });
  });
});