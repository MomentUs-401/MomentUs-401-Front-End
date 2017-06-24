'use strict';

const expect = require('chai').expect;


describe('Testing the Landing Controller', function() {
  beforeEach(done => {
    angular.mock.module('momentus');
    angular.mock.inject(($controller) => {
      this.landingCtrl = new $controller('LandingController');
      this.landingCtrl.$onInit();
      done();
    });
  });
  
  it('Should not show the signup feature', done => {
    expect(this.landingCtrl.showSignup).to.be.false;
    done();
  });
});