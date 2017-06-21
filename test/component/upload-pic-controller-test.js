'use strict';

const expect = require('chai').expect;

describe('Testing the Upload Pic Controller', function() { /* eslint-disable */
  beforeEach(done => {    
    angular.mock.module('momentus');
    angular.mock.inject(($componentController, $rootScope) => {
      this.$componentController = $componentController;
      this.$rootScope = $rootScope;
      this.uploadPicCtrl = new $componentController('uploadPicController');
      this.uploadPicCtrl.$onInit();
      done();
    });
  });
  
  
  it('should have a title', done => {    
    expect(this.uploadPicCtrl.pic).to.be.an('object');
    done();
  });
});