import {findRootNode, TreeElementNode} from '@plain-react/core';
import {TreeElementRootNode} from '../types';
import {appendToParent, createElement, createFragment} from './elements';

type UpdatedCallback = () => void;

export default function updateContainer(
    node: TreeElementNode,
    callback?: UpdatedCallback
): void {
    walkTree(node);
}

function walkTree(node: TreeElementNode) {
    const next = node.next;
    const siblings = node.siblings;

    let parent: Element;
    if (!node.prev) {
        if (!node.name) {
            // 到这里一定是因为第一个节是一个文本节点或者是注释节点.
            return;
        }
        parent = createElement(node) as Element;
    } else {
        parent = (node.prev as TreeElementNode).elem as Element;
    }

    appendToParent(parent, createElement(node));

    if (siblings) {
        const fragment = createFragment();
        for (let idx = 0; idx < siblings.length; idx++) {
            const siblingNode = siblings[idx];
            createElement(siblingNode);
            walkTree(siblingNode);
        }
        appendToParent(parent, fragment);
    }

    if (next) {
        walkTree(next);
    } else {
        const rootNode = findRootNode(node) as TreeElementRootNode;
        if (rootNode && rootNode.elem) {
            rootNode.root.container.appendChild(rootNode.elem);
        }
    }
}
