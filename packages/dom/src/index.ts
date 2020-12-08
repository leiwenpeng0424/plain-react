import {createTreeRoot, TreeNode, TreeRoot} from '@plain-react/core';

export default function render(elementNodeTree: TreeNode, dom: Element): void {
    if (!dom) {
        throw new TypeError('invalid DOM element');
    }

    renderRoot(elementNodeTree, dom);
}

function renderRoot(node: TreeNode, dom: Element): TreeRoot {
    const root = createTreeRoot(node, dom);
    return root;
}
