// diff vnode

import { VNode, Patch } from '../types';
import patchTypes from './patchTypes';
import diffProps from './diff-props';
import { isTextNode } from './utils';

/**
 *
 * @param newTree new
 * @param oldTree old
 */
export default function diff(newTree: VNode, oldTree: VNode): Patch {
  const patch = { node: newTree, effects: [] };

  traverse(oldTree, patch);

  return patch;
}

function traverse(node: VNode, patch: Patch): void {
  const { node: aNode } = patch;

  /**
   * ！！！不需要diff的情况
   * 1. 没有比对的节点，缺少节点对象
   * 2. 两个节点严格相等
   */
  if (!aNode || !node || aNode === node) return;

  const effects = patch.effects;

  // 父节点已经连标签都变了，直接替换整个节点
  if (node.tagName !== aNode.tagName) {
    effects.push({ type: patchTypes.replace, node, data: {} });
  }

  // 如果标签没有变，那就比对props和children的变化。
  diffProps(aNode, node, patch);
  diffChildren(aNode, node, patch);
}

function diffChildren(aChild: VNode, bChild: VNode, patch: Patch) {
  const effects = patch.effects,
    aChildLen = aChild?.children?.length || 0,
    bChildLen = bChild?.children?.length || 0;

  // 旧树有，新树没有，全部移除
  if (bChild.children === undefined && aChild.children !== undefined) {
    effects.push({
      type: patchTypes.add,
      node: bChild,
      data: { child: aChild.children }
    });
  }

  // 旧树没有，新树有，全部添加
  if (bChild.children !== undefined && aChild.children === undefined) {
    effects.push({
      type: patchTypes.remove,
      node: bChild,
      data: { child: bChild.children }
    });
  }

  // 两树都有，那就比对一下
  if (bChild.children && aChild.children) {
    // old keys, 旧节点的子节点key的集合，用来和新节点数据作比对。
    const oldKeys =
      bChild.children?.map((child) => (child as VNode).data?.key) || [];

    if (aChildLen === bChildLen) {
      //  children长度相同，查看child是否内部有重新排序的情况

      let idx = 0;
      // old-node上存在的keys

      while (idx < aChildLen) {
        const aChildNode = aChild.children?.[idx] as VNode;
        const bChildNode = bChild.children?.[idx] as VNode;

        if (isTextNode(aChildNode) && isTextNode(bChildNode)) {
          if (aChildNode.text !== bChildNode.text) {
            effects.push({
              type: patchTypes.remove,
              node: bChildNode,
              data: { parent: bChild }
            });
            effects.push({
              type: patchTypes.add,
              node: aChildNode,
              data: { parent: bChild }
            });
          }
        }

        // key一样的话可以直接比对props，记录props的变化
        if (aChildNode.data?.key === bChildNode.data?.key) {
          diffProps(aChildNode, bChildNode, patch);
        } else {
          // key不一样了，说明有元素的位置发生了变化，或者是删减增加了同样多的元素，所以总量保持不变。
          if (oldKeys.includes(aChildNode.data?.key)) {
            //  存在key，但是位置不一样了
            effects.push({
              type: patchTypes.reorder,
              node: bChildNode,
              data: {
                old: oldKeys.indexOf(aChildNode.data?.key), // 旧的位置
                new: idx, // 新的位置
                parent: bChild
              }
            });
          } else {
            // 不存在，说明添加了一个新node，同时移除了一个旧的node
            effects.push({
              type: patchTypes.add,
              node: bChildNode,
              data: { child: aChildNode }
            }); // aChildNode.data?.key
            effects.push({
              type: patchTypes.remove,
              node: bChildNode,
              data: { parent: bChild }
            }); // oldKeys[idx]
          }
        }

        if (aChildNode.children) {
          diffChildren(aChildNode, bChildNode, patch);
        }

        idx++;
      }
    } else {
      //  子节点的长度已经不一样了，说明是有增减的，需要找出增减的部分，并记录
      let idx = 0;

      while (idx < aChildLen) {
        const aChildNode = (aChild as VNode[])[idx],
          bChildNode = (bChild as VNode[])[idx];

        const oldIdx = oldKeys.indexOf(aChildNode.data?.key);

        // 子节点位置没有变
        if (oldIdx === idx) {
          diffProps(aChildNode, bChildNode, patch);
        } else {
          // 子节点仍存在，但是已不在原来的位置
          if (oldKeys.includes(aChildNode.data?.key)) {
            effects.push({
              type: patchTypes.reorder,
              node: bChildNode,
              data: {
                order: { old: oldIdx, new: idx, parent: bChild }
              }
            });
          } else {
            // 不存在，那就是新增了一个
            effects.push({
              type: patchTypes.add,
              node: aChildNode,
              data: { parent: bChild }
            });
          }
        }

        if (oldIdx !== -1) {
          oldKeys.splice(oldIdx, 1);
        }

        if (aChildNode.children) {
          diffChildren(aChildNode, bChildNode, patch);
        }

        idx++;
      }

      // 因为不等长，所以最后还得做一次清除。child遍历完了还存在oldKey，说明这些key已经被删除掉了，可以全部移除
      if (oldKeys.length > 0) {
        for (let i = 0; i < oldKeys.length; i++) {
          const childNode = bChild.children?.[i];

          effects.push({
            type: patchTypes.remove,
            node: childNode as VNode,
            data: { parent: bChild }
          });
        }
      }
    }
  }
}
