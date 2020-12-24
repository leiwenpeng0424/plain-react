/**
 *
 * render into target dom
 *
 */
import {TreeNode} from '@vvs/core';
import {createContainer} from './Elements';

export default function render(node: TreeNode, container: Element): void {
    const rootContainer = createContainer(node, container);
    console.log('%o',rootContainer);
}
