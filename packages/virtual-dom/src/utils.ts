import { VNode } from '../types';

export function isTextNode(node: VNode) {
  return node.text !== undefined && node.tagName === undefined;
}
