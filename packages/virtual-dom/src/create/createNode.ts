import { VNode, VNodeChildren, VNodeData } from '../../types';
import NodeTypes from '../const/NodeTypes';

export function createNode(
  name: string | VNode,
  data: VNodeData,
  children: VNodeChildren
): VNode {
  // if it's already a VNode, just return it, but using the new data & children
  if (typeof name !== 'string') {
    children = [...(name.children || []), ...children];
    data = Object.assign({}, name.data, data);
  }

  // make sure all children nodes are VNode
  children = children.map((child) => {
    if (
      typeof child === 'string' ||
      typeof child === 'boolean' ||
      typeof child === 'undefined' ||
      child === null
    ) {
      return {
        type: NodeTypes.text,
        data: { text: child }
      };
    }

    return child;
  });

  return {
    type:
      typeof name !== 'string' ? NodeTypes.inner_component : NodeTypes.element,
    tagName: name,
    data,
    children
  };
}
