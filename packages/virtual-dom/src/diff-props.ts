//
import { VNode, VNodeData, Patch } from '../types';
import patchTypes from './patchTypes';

export default function diffProps(
  newNode: VNode,
  oldNode: VNode,
  patch: Patch
): void {
  const effects = patch.effects;

  if (!newNode.data || !oldNode.data) {
    return;
  }

  const { key: aKey, ...aProp } = newNode.data;
  const { key: bKey, ...bProp } = oldNode.data;

  if (aKey !== bKey) {
    // 只要key不一样，就相当于是一个替换操作，会重新渲染这个组件。
    effects.push({
      type: patchTypes.replace,
      node: oldNode,
      data: {
        node: oldNode,
        newOld: newNode
      }
    });
  } else {
    for (const aKey in aProp) {
      if (Object.prototype.hasOwnProperty.call(aProp, aKey)) {
        if (aProp[aKey] !== bProp[aKey]) {
          effects.push({
            type: patchTypes.update,
            node: oldNode,
            data: { field: aKey }
          });
        }
      }
    }
  }
}
