import {VNode} from '../../types';
import {doc as getDoc} from './dom-util';
import NodeTypes from '../const/NodeTypes';

const doc = getDoc();

export default function render(node: VNode): VNode {
  const {children, tagName, type, data} = node;

  let elem;

  switch (type) {
    case NodeTypes.text:
      elem = doc.createTextNode(data?.text as string);
      break;
    case NodeTypes.element:
      elem = doc.createElement(tagName as string);
      break;
    case NodeTypes.inner_component:
      break;
    default:
      break;
  }

  node.elem = elem;

  let len = 0;

  if (children) {
    while (len < children.length) {
      renderChildren(elem, (children as VNode[])[len]);
      len++;
    }
  }

  return node;
}

function renderChildren(parent: Node | Element | undefined, child: VNode): void {
  if (!parent) {
    // 向上查找parent？
  } else {
    parent.appendChild(render(child).elem as Node);
  }
}
