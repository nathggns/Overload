var overload = require('../src/overload');
var should = require('should');

describe('overload', function() {
    describe('arity', function() {
        it('should exist', function() {
            overload.should.have.property('arity');
        });

        it('should work', function() {
            var two_or_three = overload.arity(2, 3);
            var obj = {};

            var res = 0;

            overload.add(obj, 'work', function(one) {
                res += 1;
            });

            overload.add(obj, 'work', two_or_three, function(one, two, three) {
                res += 2;
            });

            obj.work('one');
            res.should.eql(1);

            obj.work('one', 'two');
            res.should.eql(3);

            obj.work('one', 'two', 'three');
            res.should.eql(5);

            obj.work('one', 'two', 'three', 'four');
            res.should.eql(5);
        });

        it('should work with saying more than or equal to', function() {
            var obj = {};
            var res = 0;

            overload.add(obj, 'work', overload.arity(3), function() {
                res++;
            });

            obj.work();
            res.should.eql(0);

            obj.work('one', 'two', 'three');
            res.should.eql(1);

            obj.work('one', 'two', 'three', 'four');
            res.should.eql(2);
        });
    });
});