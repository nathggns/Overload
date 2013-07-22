var overload = require('../src/overload');
var should = require('should');

describe('overload', function() {
    describe('inherit', function() {
        it('should exist', function() {
            overload.should.have.property('inherit');
        });

        it('should work', function() {
            var obj = {};

            var res;

            overload.inherit(obj, 'work', function() {
                return typeof res === 'undefined';
            }, function() {
                res = 'abc';
            });

            overload.inherit(obj, 'work', function() {
                return res === 'abc';
            }, function() {
                res = 'def';
            });

            obj.work();
            obj.work();

            res.should.eql('def');
        });

        it('should be able to "protect" a method by passing in a condition with no method', function() {
            var obj = {};

            var called = false;

            overload.inherit(obj, 'work', function(method, args) {
                return args.length === 0;
            }, function() {
                called = true;
            });

            overload.inherit(obj, 'work', function() {
                // You'd do some protection condition stuff here,
                // return true to stop the execution chain.
                return true;
            });

            obj.work();

            called.should.eql(false);
        });

        it('should pass in arguments to the condition', function() {
            var obj = {};

            var _args;

            overload.inherit(obj, 'work', function(method, args) {
                _args = args;
            });

            var args = ['a', {}, function(){}, Math.random()];

            obj.work.apply(obj, args);

            _args.should.eql(args);
        });

        it('should work with passing in a number as a shortcut', function() {
            var obj = {};

            var i = 0;

            overload.inherit(obj, 'work', 0, function() {
                i++;
            });

            overload.inherit(obj, 'work', 1, function() {
                i += 2;
            });

            obj.work();
            obj.work('a');

            i.should.eql(3);
        });

        it('should work with passing in values', function() {
            var obj = {};

            var i = 0;

            overload.inherit(obj, 'work', true, function() {
                i++;
            });

            overload.inherit(obj, 'work', false, function() {
                i--;
            });

            obj.work();
            obj.work();

            i.should.eql(2);
        });

        it('should work as a "catch" when there are no methods', function() {
            var obj = {};

            overload.inherit(obj, 'work');

            obj.work();
        });
    });
});