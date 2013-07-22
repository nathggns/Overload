/*!
 * overload v1.0.0
 * Copyright (c) 2013 Nathaniel Higgins; Licensed MIT
 * Built on 2013-07-22 
 */
(function (root, name, dependencies, factory) {

    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(name, ['exports'].concat(dependencies), factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory.apply(root, [exports].concat(dependencies.map(function(dependency) {
            return require(dependency);
        })));
    } else {
        // Browser globals
        factory.apply(root, [root[name] = {}].concat(dependencies.map(function(dependency) {
            return root[dependency];
        })));
    }
}(this, 'extend', ['heir'], function (exports, heir) {

    'use strict';

    // For tests
    exports.heir = heir;

}));