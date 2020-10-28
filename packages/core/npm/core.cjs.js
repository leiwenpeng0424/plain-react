'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.createElement = void 0;
function createElement(element, props, children) {
    if (children === undefined) {
        children = [];
    }
    return {
        tag: element,
        $$typeof: element,
        props: props,
        children: children,
    };
}
exports.createElement = createElement;
