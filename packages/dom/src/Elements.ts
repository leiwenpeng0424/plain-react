/**
 * - 包装节点树, 从以children为关系的关联关系转换成一对一的上下关系
 *   使用next字段表示下级, 使用prev字段表示上级, siblings字段表示同级.
 *
 * -
 */

import {TreeNode} from '@vvs/core';

export type TreeElementNode = {
    prev?: TreeElementNode;
    next?: TreeElementNode;
    siblings?: Array<TreeElementNode>;
} & TreeNode;

export type TreeRootNode = {
    node: TreeElementNode;
    container: Element;
};

export function createContainer(
    node: TreeNode,
    container: Element
): TreeRootNode {
    const root = {
        node,
        container
    };

    return createLinkedNode(root);
}

function createLinkedNode(root: TreeRootNode): TreeRootNode {
    root.node = linkNode(root.node);
    return root;
}

//
function linkNode(node: TreeNode, parent?: TreeElementNode): TreeElementNode {
    const elementNode: TreeElementNode = {
        ...node,
        prev: parent
    };

    const curChildren = node.children?.slice(0);

    if (curChildren && curChildren.length >= 1) {
        elementNode.next = linkNode(curChildren[0], elementNode);
    }

    if (parent && parent.children) {
        const preChildren = parent.children.slice(0);

        const siblings: Array<TreeElementNode> = preChildren
            .slice(1)
            .map((child: TreeNode) => linkNode(child, elementNode));

        elementNode.siblings = siblings;
    }

    return elementNode;
}

export function updateContainer(node: TreeElementNode): void {}
