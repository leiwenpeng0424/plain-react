//
import { VNode, VNodeData, Patch } from '../types';
import patchTypes from './patchTypes';

export default function diffProps(a: VNode, b: VNode, patch: Patch): void {
  const effects = patch.effects;

  const aProp = a.data as VNodeData;
  const bProp = b.data as VNodeData;

  if (!a || !b) return;

  if (aProp.key !== bProp.key) {
    // 只要key不一样，就相当于是一个替换操作，会重新渲染这个组件。
    effects.push({ type: patchTypes.replace });
  } else {
    for (const aKey in a) {
      if (Object.prototype.hasOwnProperty.call(a, aKey)) {
        if (aProp[aKey] !== bProp[aKey]) {
          effects.push({ type: patchTypes.update });
        }
      }
    }
  }
}
