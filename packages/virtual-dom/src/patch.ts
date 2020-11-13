import { VNode } from '../types';

function appendChild(parent: VNode, node: VNode): void {
  parent.elem?.appendChild(patch(node).elem as Node);
}

export default function patch(node: VNode): VNode {
  const { children } = node;
  if (children) {
    (children as VNode[]).forEach((child) => {
      appendChild(node, child);
    });
  }

  return node;
}
