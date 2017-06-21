'use strict';

const expect = require('chai').expect;

describe.only('Testing the Thumbnail Container Controller', function() { /* eslint-disable */
  beforeEach(done => {    
    angular.mock.module('momentus');
    angular.mock.inject(($componentController, $rootScope) => {
      this.$componentController = $componentController;
      this.$rootScope = $rootScope;
      this.memoryItemCtrl = new $componentController('memoryItemController');
      this.memoryItemCtrl.$onInit();
      done();
    });
  });
  
  
  it('should have a title', done => {    
    expect(this.memoryItemCtrl.showEditMemory).to.be.false;
    done();
  });
});