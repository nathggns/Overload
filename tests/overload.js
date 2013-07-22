var overload = require('../src/overload');
var should = require('should');

describe('overload', function() {
    describe('inherit', function() {
        it('it should exist', function() {
            overload.should.have.property('inherit');
        });
    });
});