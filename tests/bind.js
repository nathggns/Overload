var overload = require('../src/overload');
var should = require('should');

describe('overload', function() {
    describe('_bind', function() {
        it('should exist', function() {
            overload.should.have.property('_bind');
        });

        it('should work for aliasing this', function() {

            var res;
            var rand = Math.random();

            overload._bind.call(function() {
                res = this;
            }, rand)();

            res.should.eql(rand);
        });

        it('should work with multiple arguments', function() {

            var res;
            var args = [Math.random(), Math.random(), Math.random()];

            overload._bind.apply(function() {
                res = [this, arguments];
            }, args)();

            res[0].should.eql(args[0]);
            res[1].should.eql(args.slice(1));
        });

        it('should pass through call time arguments', function() {
            var res;
            var _this = Math.random();
            var arg = Math.random();
            var rand = Math.random();

            overload._bind.call(function() {
                res = [this, arguments];
            }, _this, arg)(rand);

            res[0].should.eql(_this);
            res[1][0].should.eql(arg);
            res[1][1].should.eql(rand);
            res[1].length.should.eql(2);
        });
    });
});