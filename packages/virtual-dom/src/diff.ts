// diff vnode

import { VNode, VNodeChildren, Patch } from '../types';
import patchTypes from './patchTypes';
import diffProps from './diff-props';

/**
 *
 * @param a new
 * @param b old
 */
export default function diff(a: VNode, b: VNode): Patch {
  const patch = { node: a, effects: [] };

  traverse(b, patch);

  return patch;
}

function traverse(node: VNode, patch: Patch): void {
  const { node: aNode } = patch;

  /**
   * ！！！不需要diff的情况
   * 1. 没有比对的节点，缺少节点对象
   * 2. 两个节点严格相等
   */
  if (!aNode || aNode === node) return;

  const effects = patch.effects;

  // 父节点已经连标签都变了，直接替换整个节点
  if (node.tagName !== aNode.tagName) {
    effects.push({ type: patchTypes.replace });
  } else {
    // 如果标签没有变，那就比对props和children的变化。
    diffProps(aNode, node, patch);
    diffChildren(aNode.children || [], node.children || [], patch);
  }
}

function diffChildren(
  aChild: VNodeChildren,
  bChild: VNodeChildren,
  patch: Patch
) {
  const effects = patch.effects;
  if (!aChild || !bChild) {
    if (!aChild && bChild !== undefined) {
      effects.push({ type: patchTypes.remove });
    }

    if (!bChild && aChild !== undefined) {
      effects.push({ type: patchTypes.add });
    }
  }

  const aChildLen = (aChild as VNode[]).length;
  const bChildLen = (bChild as VNode[]).length;

  // old keys, 旧节点的子节点key的集合，用来和新节点数据作比对。
  const oldKeys = (bChild as VNode[]).map((child) => child.data?.key);

  if (aChildLen === bChildLen) {
    //  children长度相同，查看child是否内部有重新排序的情况

    let idx = 0;
    // old-node上存在的keys

    while (idx < aChildLen) {
      const aChildNode = (aChild as VNode[])[idx];
      const bChildNode = (bChild as VNode[])[idx];
      // key一样的话可以直接比对props，记录props的变化
      if (aChildNode.data?.key === bChildNode.data?.key) {
        diffProps(aChildNode, bChildNode, patch);
      } else {
        // key不一样了，说明有元素的位置发生了变化，或者是删减增加了同样多的元素，所以总量保持不变。
        if (oldKeys.includes(aChildNode.data?.key)) {
          //  存在key，但是位置不一样了
          effects.push({
            type: patchTypes.reorder,
            order: {
              old: oldKeys.indexOf(aChildNode.data?.key), // 旧的位置
              new: idx // 新的位置
            }
          });
        } else {
          // 不存在，说明添加了一个新node，同时移除了一个旧的node
          effects.push({ type: patchTypes.add }); // aChildNode.data?.key
          effects.push({ type: patchTypes.remove }); // oldKeys[idx]
        }
      }

      if (aChildNode.children) {
        diffChildren(aChildNode.children, bChildNode.children || [], patch);
      }

      idx++;
    }
  } else {
    //  子节点的长度已经不一样了，说明是有增减的，需要找出增减的部分，并记录
    let idx = 0;

    while (idx < aChildLen) {
      const aChildNode = (aChild as VNode[])[idx];
      const bChildNode = (bChild as VNode[])[idx];

      const oldIdx = oldKeys.indexOf(aChildNode.data?.key);

      // 子节点位置没有变
      if (oldIdx === idx) {
        diffProps(aChildNode, bChildNode, patch);
      } else {
        // 子节点仍存在，但是已不在原来的位置
        if (oldKeys.includes(aChildNode.data?.key)) {
          effects.push({
            type: patchTypes.reorder,
            order: { old: oldIdx, new: idx }
          });
        } else {
          effects.push({ type: patchTypes.add });
        }
      }

      if (oldIdx !== -1) {
        oldKeys.splice(oldIdx, 1);
      }

      if (aChildNode.children) {
        diffChildren(aChildNode.children, bChildNode.children || [], patch);
      }

      idx++;
    }

    // 因为不等长，所以最后还得做一次清除。child遍历完了还存在oldKey，说明这些key已经被删除掉了，可以全部移除
    if (oldKeys.length > 0) {
      oldKeys.forEach(() => effects.push({ type: patchTypes.remove }));
    }
  }
}
