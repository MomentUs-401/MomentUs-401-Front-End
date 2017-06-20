'use strict';

const expect = require('chai').expect;


describe('Testing the Landing Controller', function() {
  beforeEach(() => {
    angular.mock.module('momentus');
    angular.mock.inject(($controller) => {
      this.landingCtrl = new $controller('LandingController');
      this.landingCtrl.$onInit();
    });
  });
  
  it('Should not show the signup feature', () => {
    expect(this.landingCtrl.showSignup).to.be.false;
  });
});