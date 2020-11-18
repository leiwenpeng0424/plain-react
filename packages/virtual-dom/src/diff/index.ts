import {Patch, Updater, VNode, VNodeChildren} from '../../types';
import PatchTypes from '../const/PatchTypes';
import createUpdater from './createUpdater';

export default function diff(oldNode: VNode, newNode: VNode): Patch {
  const patch = {
    root: oldNode,
    updater: {node: oldNode, effects: []}
  };

  diffNode(newNode, patch.updater);

  return patch;
}

function diffNode(newNode: VNode, update: Updater): Updater {
  const {node} = update;

  update.next = createUpdater(node);
  if (node.type !== newNode.type) {
    update.effects.push({type: PatchTypes.remove, data: {node}});
    update.effects.push({type: PatchTypes.add, data: {node: newNode}});
  } else {
    diffChildren(newNode, node, update.next);
  }

  return update;
}

function diffChildren(newNode: VNode, oldNode: VNode, update: Updater): void {
  const a = newNode.children;
  const orderedSet = sortChildren(a, oldNode.children, update);
  console.log('order output', orderedSet.children, a);
  return;
}

type Move = {
  remove: unknown[];
  insert: unknown[];
};

/**
 * @desc 对旧节点进行预排序。
 * @param a
 * @param b
 * @param update
 */
function sortChildren(
  a: VNodeChildren,
  b: VNodeChildren,
  update: Updater
): {moves: Move; children: (VNode | null)[]} {
  const newChildren: (VNode | null)[] = [];
  const moves: Move = {
    insert: [],
    remove: []
  };

  const result = {
    moves,
    children: newChildren
  };

  const keyedA = keyIndex(a);
  const aFree = keyedA.free;
  const aLen = a.length;
  const bLen = b.length;

  if (aFree.length === aLen) {
    return {moves, children: b};
  }

  const keyedB = keyIndex(b);
  const bKeys = keyedB.keys;
  const bFree = keyedB.free;

  if (bFree.length === bLen) {
    return {moves, children: b};
  }

  let idx = 0;
  let freeIdx = 0;
  const freeCount = bFree.length;

  while (idx < a.length) {
    const aKey = a[idx].data.key;
    let itemIndex: number;
    if (aKey) {
      if (bKeys.has(aKey)) {
        itemIndex = bKeys.get(aKey) as number;
        newChildren.push(b[itemIndex]);
      } else {
        newChildren.push(null);
      }
    } else {
      if (freeIdx < freeCount) {
        itemIndex = bFree[freeIdx];
        newChildren.push(b[itemIndex]);
        freeIdx++;
      } else {
        newChildren.push(null);
      }
    }

    idx++;
  }

  if (idx < bLen) idx = 0;

  while (idx < bLen) {
    const item = b[idx];

    if (item.data.key) {
      if (!keyedA.keys.has(item.data.key)) {
        newChildren.push(item);
      }
    } else {
      if (bFree[freeIdx++] || idx >= bLen) {
        newChildren.push(item);
      }
    }

    idx++;
  }

  return result;
}

/**
 * @desc 输出children的key集合以及没有key的下标集合。
 * @param nodeChild
 */
function keyIndex(nodeChild: VNodeChildren): {keys: Map<unknown, unknown>; free: number[]} {
  // 存在的key以及对应的下标
  const keys: Map<unknown, unknown> = new Map();
  // 不存在key的下标
  const free: number[] = [];
  let idx = 0;
  while (idx < nodeChild.length) {
    const n = nodeChild[idx];
    if (n.data.key) {
      keys.set(n.data.key, idx);
    } else {
      free.push(idx);
    }
    idx++;
  }

  return {keys, free};
}
