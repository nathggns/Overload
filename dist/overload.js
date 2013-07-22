/*!
 * overload v1.0.0
 * Copyright (c) 2013 Nathaniel Higgins; Licensed MIT
 * Built on 2013-07-22 
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
}(this, 'overload', ['heir'], function (exports, heir) {
    'use strict';

    // For tests
    exports.heir = heir;

    // This is the function that does the actual overloading, we'll use this internally too!
    var overload = function(object, name, condition, method) {
        var old = object[name] || function(){};

        object[name] = function() {

            var callee;

            if (condition.call(object, method, arguments)) {
                callee = method;
            } else {
                callee = old;
            }

            return callee.apply(method, arguments);
        };
    };

    overload(exports, 'inherit', function() {
        return true;
    }, function() {
        return overload.apply(this, arguments);
    });

    overload(exports, 'inherit', function(method, args) {
        if (typeof args[2] === 'number') {
            return true;
        }
    }, function() {
        var args = arguments;
        var num = arguments[2];

        args[2] = function(method, args) {
            return args.length === num;
        };

        return overload.apply(this, args);
    });

}));