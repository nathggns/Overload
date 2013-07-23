var overload = require('../src/overload');
var should = require('should');

describe('overload', function() {
    describe('clean', function() {
        it('should exist', function() {
            overload.should.have.property('clean');
        });

        it('should work', function() {
            var clean = overload.clean();
            var o = {};
            var res;

            clean(o, 'work', function() {
                return !res;
            }, function() {
                res = 'abc';
            });

            clean(o, 'work', function() {
                return res === 'abc';
            }, function() {
                res = 'def';
            });

            o.work();
            res.should.eql('abc');

            o.work();
            res.should.eql('def');
        });
    });
});