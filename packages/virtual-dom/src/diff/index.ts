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
    // 如果两个节点的类型都不一样了,就直接重新渲染,不需要再往下比对了,就认为整个dom数都已经变化了。
    // data也不需要再比对了。
    update.effects.push({type: PatchTypes.remove, data: {node}});
    update.effects.push({type: PatchTypes.add, data: {node: newNode}});
  } else {
    diffChildren(newNode, node, update.next);
  }

  return update;
}

function diffChildren(newNode: VNode, oldNode: VNode, update: Updater): void {
  const a = newNode.children;
  // 这一步，将b的children按照a的child key进行排序，看看那些对的上，哪些是需要增加或者删除的。
  const orderedSet = sortChildren(a, oldNode.children, update);
  console.log('-->', orderedSet.children, a);
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
    insert: [], // 插入
    remove: [] // 移除
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
    //  所有子节点都没有key，那就不排序了
    return {moves, children: b};
  }

  const keyedB = keyIndex(b);
  const bKeys = keyedB.keys;
  const bFree = keyedB.free;

  if (bFree.length === bLen) {
    //  所有子节点都没有key，那就不排序了
    return {moves, children: b};
  }

  // 以上的逻辑，a , b节点，如果有一方都是没有key的节点，就都不需要进行排序了。
  // 返回a节点即可，表示并未在这里那个子节点中发现任何移动或者插入的现象，
  // 在后面的渲染中，会作为全新的节点进行处理。

  // 根据 a 的key顺序，对 b 进行重新排序，最后返回的是 b 的 children
  let idx = 0;
  let freeIdx = 0;
  const freeCount = bFree.length; // 最后给出的是 b 所以这里用 b 的 free 来做比较。

  while (idx < a.length) {
    const aKey = a[idx].data.key;
    let itemIndex: number;
    if (aKey) {
      if (bKeys.has(aKey)) {
        // has old key, find old key index & push the node to the newChildren array list.
        itemIndex = bKeys.get(aKey) as number;
        newChildren.push(b[itemIndex]);
      } else {
        // aKey is not in bKeys
        // 这里肯定是删除了什么东西了
        newChildren.push(null);
      }
    } else {
      // aKey不存在，那就直接推 free 中没有 key 的集合
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

  // b 比 a 还要长，那还是需要继续操作，要不然 返回的 b 会比较短
  // 重置 idx，遍历 b 节点，补上上面没有遍历到的节点。
  if (idx < bLen) idx = 0;

  while (idx < bLen) {
    const item = b[idx];

    if (item.data.key) {
      if (!keyedA.keys.has(item.data.key)) {
        newChildren.push(item);
      }
    } else {
      // bFree 如果还有没有使用的值，说明可以放心地推数据，
      // 如果 idx 已经是bLen了，那么，也可以放心地推。
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
