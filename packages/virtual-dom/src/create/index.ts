import { VNode, VNodeChildren, VNodeData } from '../../types';
import { createNode } from './createNode';

export default function createElement(
  tagName: string | VNode,
  data?: VNodeData,
  children?: VNodeChildren
): VNode {
  if (!children) {
    children = [];

    if (data && Array.isArray(data)) {
      children = data;
      data = {};
    }
  } else {
    if (!Array.isArray(children)) {
      children = [children];
    }
  }

  if (!data) {
    data = {};
  } else {
    if (Array.isArray(data)) {
      throw new TypeError(
        'expect data to be an Object, instead of ' + typeof data
      );
    }

    try {
      if ('children' in data) {
        children = children.concat(data.children as VNodeChildren);
      }
    } catch (e) {
      throw new TypeError(
        'expect data to be a Array or Object, instead of ' + typeof data
      );
    }
  }

  return createNode(tagName, data, children);
}
