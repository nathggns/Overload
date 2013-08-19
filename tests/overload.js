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

        it('should set the context equal to the object', function() {
            var obj = {
                rand: Math.random()
            };

            var res;

            overload.add(obj, 'work', true, function() {
                res = this.rand || false;
            });

            obj.work();

            res.should.eql(obj.rand);
        });

        it('should set the context equal to the object even with prototypes', function() {
            var Obj = function() {
                this.rand = Math.random();
            };

            var res;

            overload.add(Obj.prototype, 'work', true, function() {
                res = this.rand || false;
            });

            var obj = new Obj();

            obj.work();

            res.should.eql(obj.rand);
        });

        it('should work with using objects as type shortcuts', function() {

            // @todo Use bitmasks
            var i = 0;
            var obj = {
                work: function() {
                    i = i ^ 1;
                }
            };

            var SomeType = function() {};
            var SomeOtherType = function() {};

            overload.add(obj, 'work', [SomeType], function() {
                i = i ^ 2;
            });

            overload.add(obj, 'work', [SomeOtherType], function() {
                i = i ^ 4;
            });

            overload.add(obj, 'work', ['string', SomeType], function() {
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