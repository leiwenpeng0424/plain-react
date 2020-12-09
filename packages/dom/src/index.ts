import {createTreeRootNode, TreeNode} from '@plain-react/core';
import {TreeElementRootNode, TreeRoot} from '../types';
import {createElement} from './elements';

export default function render(elementNodeTree: TreeNode, dom: Element): void {
    if (!dom) {
        throw new TypeError('invalid DOM element');
    }

    const root: TreeElementRootNode = renderRoot(elementNodeTree, dom);
}

function renderRoot(node: TreeNode, dom: Element): TreeElementRootNode {
    const rootNode = createTreeRootNode(node);

    const root: TreeRoot = {
        container: dom
    };

    rootNode.root = root;

    return rootNode as TreeElementRootNode;
}
