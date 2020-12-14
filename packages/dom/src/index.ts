import {createTreeRootNode, TreeNode} from '@plain-react/core';
import {TreeElementRootNode} from '../types';
import updateContainer from './UpdateContainer';

export default function render(elementNodeTree: TreeNode, dom: Element): void {
    if (!dom) {
        throw new TypeError('invalid DOM element');
    }

    const root: TreeElementRootNode = renderRoot(elementNodeTree, dom);
    updateContainer(root);
}

function renderRoot(node: TreeNode, dom: Element): TreeElementRootNode {
    const rootNode = createTreeRootNode(node);

    rootNode.root = {
        container: dom
    };

    return rootNode as TreeElementRootNode;
}
