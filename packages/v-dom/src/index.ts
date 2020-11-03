import { Attrs, VNode, VTree, VPatch } from '../types';

function createNode(tagName: string, props: Attrs, children?: VNode[]): VNode {
  return { tagName, props, children, type: 'NODE' };
}

function createTree(node: VNode, prev?: VNode, siblings?: VNode[]): VTree {
  // make a tree
  let { children } = node;

  if (siblings) {
    siblings.map((child) => createTree(child, node));
  }

  if (!children) {
    return {
      node,
      prev,
      siblings,
      next: undefined
    };
  }

  if (!Array.isArray(children)) {
    children = [children];
  }

  return { node, prev, siblings, next: createTree(children[0], node, children.slice(1)) };
}

function patch(a: VTree, b: VTree): VPatch {
  const c = {};
  return {
    type: 'ADD',
    tree: {
      prev: b.prev,
      node: b.node,
      next: b.next
    }
  };
}

export { createNode, createTree, patch };
