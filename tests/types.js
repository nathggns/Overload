var overload = require('../src/overload');
var should = require('should');

describe('overload', function() {
    describe('types', function() {
        it('should exist', function() {
            overload.should.have.property('types');
        });

        it('should work', function() {
            var i = 0;
            var obj = {
                work: function() {
                    i = i ^ 1;
                }
            };

            var SomeType = function() {};
            var SomeOtherType = function() {};

            overload.add(obj, 'work', overload.types([SomeType]), function() {
                i = i ^ 2;
            });

            overload.add(obj, 'work', overload.types([SomeOtherType]), function() {
                i = i ^ 4;
            });

            overload.add(obj, 'work', overload.types(['string', SomeType]), function() {
                i = i ^ 8;
            });

            obj.work();
            obj.work(new SomeType());
            obj.work('abc', new SomeType());

            (!!(
                i & 1 &&
                i & 2 &&
                i & 8
            )).should.eql(true);

            (!!(i & 4)).should.eql(false);
        });
    });
});