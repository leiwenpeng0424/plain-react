import {Patch, Updater, VNode} from '../../types';
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

  update.next = createUpdater(newNode);
  if (node.type !== newNode.type) {
    // 如果两个节点的类型都不一样了,就直接重新渲染,不需要再往下比对了,就认为整个dom数都已经变化了。
    // data也不需要在比对了。
    update.effects.push({type: PatchTypes.remove, data: {node}});
    update.effects.push({type: PatchTypes.add, data: {node: newNode}});
  } else {
    diffChildren(node, update.next);
  }

  return update;
}

function diffChildren(node: VNode, update: Updater): void {
  const {node: oldNode} = update;

  return;
}

// function createDiffQueue<T extends F[], F>(queue: T, subDiff: F): T {
//   queue.push(subDiff);
//   return queue;
// }
