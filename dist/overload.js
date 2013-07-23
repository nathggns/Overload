/*!
 * overload v1.0.2
 * Copyright (c) 2013 Nathaniel Higgins; Licensed MIT
 * Built on 2013-07-23 
 */
(function (root, name, dependencies, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        Array.prototype.unshift.call(dependencies, 'exports');

        return define(name, dependencies, factory);
    }

    var merged = [];
    var merger;

    if (typeof exports === 'object') {
        // CommonJS
        merger = function(dependency) {
            return require(dependency);
        };

        merged.push(exports);
    } else {
        // Browser globals
        merger = function(dependency) {
            return root[dependency];
        };

        merged.push(root[name] = {});
    }

    for (var i = 0, l = dependencies.length; i < l; i++) {
        if (Object.prototype.hasOwnProperty.call(dependencies, i)) {
            merged.push(merger.call(merged, dependencies[i]));
        }
    }

    return factory.apply(root, merged);
}(this, 'overload', [], function (exports) {
    'use strict';

    /**
     * Polyfill for Function.prototype.bind
     * Expects to be called in the context of the function
     */
    exports._bind = function() {
        var args = Array.prototype.slice.call(arguments);
        var _this = args.shift();
        var fn = this;
        var fnIO = function() {};

        var retval = function() {
            return fn.apply(
                this instanceof fnIO && _this ? this : _this,
                args.concat(Array.prototype.slice.call(arguments))
            );
        };

        return retval;
    };

    Function.prototype.bind = Function.prototype.bind || exports._bind;

    /**
     * Overload a method
     * @param  {object}   object    The object to overload the method on
     * @param  {string}   name      The name of the method
     * @param  {Function} condition The function to determine if this is the method to use
     * @param  {Function} method    The method to call. Optional. If not passed, it will simply
     *                              stop the overload chain
     */
    var overload = function(object, name, condition, method) {
        /**
         * Save a reference to the previous overloaded method
         */
        var old = object[name];

        object[name] = function() {

            var callee;

            if (!condition) {
                var stack = new Error().stack;
                console.log(stack);
            }

            /**
             * If the condition passes, we want to apply the method
             */
            if (condition.call(object, method, arguments)) {
                callee = method;
            } else {
                callee = old;
            }

            /**
             * Only call the callee if we have a callee to call.
             * This won't happen if no method is passed in, or
             * if the condition failed and we're the first method in the chain
             */
            if (typeof callee === 'function') {
                return callee.apply(method, arguments);
            }
        };
    };

    /**
     * Handle normal calls to the method
     */
    // exports.add = overload.bind(exports);
    overload(exports, 'add', function() {
        return true;
    }, function() {
        return overload.apply(this, arguments);
    });

    /**
     * If condition is simply a value, we'll wrap that value in a function
     */
    overload(exports, 'add', function(method, args) {
        return typeof args[2] !== 'function';
    }, function() {
        var args = arguments;
        var val = arguments[2];

        args[2] = function() {
            return val;
        };

        return overload.apply(this, args);
    });

    /**
     * Handles calls when there is no condition,
     * using overload as a "catch"
     */
    overload(exports, 'add', function(method, args) {
        return args.length < 3 || typeof args[2] === 'undefined';
    }, function() {
        var args = arguments;

        /**
         * We have to use Array.push otherwise weird stuff happens
         * @see http://jsfiddle.net/DVvPv/1/
         */
        Array.prototype.push.call(args, function() {
            return false;
        });

        return overload.apply(this, args);
    });

    /**
     * Handle pulling arity from the method defintion itself
     */
    overload(exports, 'add', function(method, args) {
        return args.length === 3 && typeof args[2] === 'function';
    }, function() {
        var args = arguments;

        Array.prototype.push.call(args, args[2]);

        args[2] = function(method, args) {
            return method.length === args.length;
        };

        return overload.apply(this, args);
    });

    /**
     * Handle calls to the method when the condition is simply a number.
     * This is just a shortcut for testing argument length
     */
    overload(exports, 'add', function(method, args) {
        return typeof args[2] === 'number';
    }, function() {
        var args = arguments;
        var num = arguments[2];

        args[2] = function(method, args) {
            return args.length === num;
        };

        return overload.apply(this, args);
    });

}));