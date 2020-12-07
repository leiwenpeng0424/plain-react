import {createRootNode, TreeNode, TreeRoot} from '@plain-react/core';

export default function render(node: TreeNode, dom: Element): void {
    renderRoot(node, dom);
}

function renderRoot(node: TreeNode, dom: Element): TreeRoot {
    return createRootNode(node, dom);
}
