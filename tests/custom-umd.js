var overload = require('../src/overload');
var should = require('should');

describe('overload', function() {
    describe('custom-umd', function() {
        it('should work with dependencies', function() {
            overload.should.have.property('add');
        });
    });
});