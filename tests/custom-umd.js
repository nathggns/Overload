var overload = require('../src/overload');
var should = require('should');
var heir = require('heir');

describe('overload', function() {
    describe('custom-umd', function() {
        it('should work with dependencies', function() {
            overload.should.have.property('heir');
            overload.heir.should.eql(heir);
        });
    });
});