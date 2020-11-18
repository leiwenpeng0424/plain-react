import {PossibleChildren, VNode, VNodeChildren, VNodeData} from '../../types';
import NodeTypes from '../const/NodeTypes';

export function createNode(
  name: string | VNode,
  data: VNodeData,
  children: PossibleChildren
): VNode & {children: VNodeChildren} {
  // if it's already a VNode, just return it, but using the new data & children
  if (typeof name !== 'string') {
    children = [...(name.children || []), ...children];
    data = Object.assign({}, name.data, data);
  }

  // 将所有的节点转换成VNode, 确保后面处理的都是VNode
  const convertedChildren = children.map((child) => {
    if (
      typeof child === 'string' ||
      typeof child === 'boolean' ||
      typeof child === 'undefined' ||
      child === null
    ) {
      return {
        type: NodeTypes.text,
        data: {text: child}
      };
    }

    return child;
  });

  return {
    data,
    tagName: name,
    children: convertedChildren as VNodeChildren,
    type: typeof name !== 'string' ? NodeTypes.inner_component : NodeTypes.element
  };
}
