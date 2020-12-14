import {TreeElementNode} from '@plain-react/core';
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
        parent = createElement(node);
    } else {
        parent = (node.prev as TreeElementNode).elem as Element;
    }

    if (siblings) {
        const fragment = createFragment();
        for (let idx = 0; idx < siblings.length; idx++) {
            appendToParent(fragment, createElement(siblings[idx]));
        }
        appendToParent(parent, fragment);
    }

    appendToParent(parent, createElement(node));
    next && walkTree(next);
}
