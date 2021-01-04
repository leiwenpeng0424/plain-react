/**
 *
 * render into target dom
 *
 */
import {TreeNode} from '@vvs/core';
import {Tree} from '../types';
import {createContainer, updateContainer} from './Elements';

/**
 * Render Method
 * @param {TreeNode} node      Root Element
 * @param {Element}  container Root Container
 */
export default function render(node: TreeNode, container: Element): void {
    const tree = createContainer(node, container);
    updateContainer(tree as Tree);
    console.log(tree);
}
