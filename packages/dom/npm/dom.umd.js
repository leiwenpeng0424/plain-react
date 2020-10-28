(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.plainCore = factory());
}(this, (function () { 'use strict';

    function dom() {
        return 'dom';
    }

    return dom;

})));
//# sourceMappingURL=dom.umd.js.map
