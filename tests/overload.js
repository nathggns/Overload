var overload = require('../src/overload');
var should = require('should');

describe('overload', function() {
    describe('add', function() {
        it('should exist', function() {
            overload.should.have.property('add');
        });

        it('should work', function() {
            var obj = {};

            var res;

            overload.add(obj, 'work', function() {
                return typeof res === 'undefined';
            }, function() {
                res = 'abc';
            });

            overload.add(obj, 'work', function() {
                return res === 'abc';
            }, function() {
                res = 'def';
            });

            obj.work();
            obj.work();

            res.should.eql('def');
        });

        it('should pass in arguments to the condition', function() {
            var obj = {};

            var _args;

            overload.add(obj, 'work', function(method, args) {
                _args = args;
            }, function() {});

            var args = ['a', {}, function(){}, Math.random()];

            obj.work.apply(obj, args);

            _args.should.eql(args);
        });

        it('should work with passing in a number as a shortcut', function() {
            var obj = {};

            var i = 0;

            overload.add(obj, 'work', 0, function() {
                i++;
            });

            overload.add(obj, 'work', 1, function() {
                i += 2;
            });

            obj.work();
            obj.work('a');

            i.should.eql(3);
        });

        it('should work with passing in values', function() {
            var obj = {};

            var i = 0;

            overload.add(obj, 'work', true, function() {
                i++;
            });

            overload.add(obj, 'work', false, function() {
                i--;
            });

            obj.work();
            obj.work();

            i.should.eql(2);
        });

        it('should work as a "catch" when there are no methods', function() {
            var obj = {};

            overload.add(obj, 'work');

            obj.work();
        });

        it('should be able to pull arity from the function definition', function() {
            var obj = {};
            var i = 0;

            overload.add(obj, 'work', function(one) {
                i++;
            });

            overload.add(obj, 'work', function(one, two) {
                i += 2;
            });

            obj.work('one');
            obj.work('one', 'two');

            i.should.eql(3);
        });
    });
});