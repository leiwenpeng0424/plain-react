import { Patch } from '../types';
import render from './render';

export default function commit(patch: Patch): void {
  const { effects } = patch;

  if (effects.length === 0) return;

  let len = effects.length - 1;

  do {
    // 依次过滤effect，不关心优化的问题
    const effect = effects[len];

    switch (effect.type) {
      case 'ADD':
        // 需要创建新的elem，最后加到父节点上
        const elemNode = render(effect.node);
        (effect.data.parent as Node).appendChild(elemNode.elem as Node);

        break;
      case 'REMOVE':
        // 从父节点上移除这个elem
        const { data, node } = effect;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (data.parent.elem as Element).removeChild(node.elem as Node);
        break;
      case 'REORDER':
        // 重新排序，可能需要移动节点，避免元素删除和创建的开销

        break;
      case 'UPDATE':
        // 元素的某些attrs可能被修改，需要更新一下

        break;
      default:
        break;
    }

    len--;
  } while (len);
}
