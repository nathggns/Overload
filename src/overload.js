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
}(this, 'extend', ['heir'], function (exports, heir) {
    'use strict';

    // For tests
    exports.heir = heir;

}));