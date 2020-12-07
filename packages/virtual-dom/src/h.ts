// import

import {VNode, VNodeChildren, VNodeData} from '../types';
import createElement from './createElement';

export default function hyperScript(
    name: keyof HTMLElementTagNameMap,
    data?: VNodeData,
    children?: VNodeChildren
): VNode {
    if (!children) children = [];
    if (data && Array.isArray(data) && !children) data = children;
    if (!data || (Array.isArray(data) && Array.isArray(children))) data = {};

    return createElement(name, data.key, data, children);
}
