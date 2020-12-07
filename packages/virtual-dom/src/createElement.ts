import {VNodeChildren, ElementKey, VNode, VNodeData} from '../types';

export default function createElement(
    name: keyof HTMLElementTagNameMap,
    key: ElementKey,
    data: VNodeData,
    children: VNodeChildren
): VNode {
    return {
        name,
        key,
        data,
        children,
        elem: undefined
    };
}
