// diff
import { Patch, Updater, VNode, VNodeChildren } from '../../types';
import NodeTypes from '../const/NodeTypes';
import PatchTypes from '../const/PatchTypes';
import createUpdater from './createUpdater';

export default function diff(oldNode: VNode, newNode: VNode): Patch {
  const patch = {
    root: oldNode,
    updater: { node: newNode, effects: [] }
  };

  diffNode(oldNode, patch.updater);

  return patch;
}

function diffNode(node: VNode, update: Updater): Updater {
  const { node: newNode } = update;

  if (node.type !== newNode.type) {
    update.effects.push({ type: PatchTypes.remove, data: { node } });
    update.effects.push({ type: PatchTypes.add, data: { node: newNode } });
  }

  // TextNode的文本发生了变化
  diffChildren(node, update);

  return update;
}

function diffChildren(node: VNode, update: Updater): void {
  const { children } = node;
  const newChildren = update.node.children as VNode[];

  if (children && newChildren) {
    const oldKeys = children.map((child) => (child as VNode).data?.key);

    let idx = 0;

    while (idx < newChildren.length) {
      const newChild = newChildren[idx];
      const oldChild = (children as VNode[])[idx];

      // key相等的情况， 直接比对props。
      if (oldChild.data?.key === newChild.data?.key) {
        // ???
        update.next = diffNode(oldChild, {
          node: newChild,
          effects: [],
          prev: update
        });
      } else {
        // key不一样。
        // 检查是不是位置变了。

        let keyIdx = -1;

        if (newChild.data?.key) {
          keyIdx = oldKeys.indexOf(newChild.data.key);

          if (keyIdx !== -1) {
            update.effects.push({
              type: PatchTypes.order,
              data: {
                key: oldKeys.splice(idx, 1)[0],
                newIndex: idx,
                oldIndex: oldKeys.indexOf(newChild.data.key)
              }
            });
            // 确认了 新的树有旧树的重复的key，那就直接删除这个key。
          } else {
            update.effects.push({
              type: PatchTypes.add,
              data: { node: newChild }
            });
          }
        } else {
          if (keyIdx === -1) {
            update.effects.push({
              type: PatchTypes.add,
              data: { node: newChild }
            });
          }
        }
      }

      idx++;
    }

    if (oldKeys.length > 0) {
      oldKeys.forEach((key) =>
        update.effects.push({
          type: PatchTypes.remove,
          data: {
            node: children.filter(
              (child) => (child as VNode).data?.key === key
            )[0]
          }
        })
      );
    }
  }
}
