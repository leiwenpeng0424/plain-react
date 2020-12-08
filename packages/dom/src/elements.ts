import {TreeElementNode, TreeElementRootNode, TreeNode, TreeRoot} from '@plain-react/core';

let ownDoc: Document;
let root: TreeRoot;

export function createElement(node: TreeNode): TreeNode {
    if (!ownDoc) {
        root = findTreeRoot(node);
        ownDoc = root.container.ownerDocument;
    }

    return node;
}

export function findTreeRoot(node: TreeElementNode): TreeRoot {
    while (node.prev) {
        node = node.prev as TreeElementNode;
    }
    const root = node;
    // no prev, it must be root now
    return (root as TreeElementRootNode).root;
}
