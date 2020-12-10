import {NodeProps, TreeElementNode, TreeNode, TreeNodeChildren} from '../types';

export function createTreeNode(
    name: string,
    key?: string | number,
    props?: NodeProps,
    children?: TreeNodeChildren
): TreeNode {
    if (props && children && props.children) {
        children = children.concat(props.children as TreeNode[]);
    }

    return {
        name,
        key,
        props,
        children
    };
}

export function createTreeRootNode(node: TreeNode): TreeElementNode {
    return linkNodes(node);
}

function linkNodes(
    node: TreeNode,
    prev?: TreeNode,
    siblings?: TreeElementNode[]
): TreeElementNode {
    let nextLink;
    (node as TreeElementNode).siblings = siblings;
    if (node.children && Array.isArray(node.children)) {
        nextLink = node.children[0];
    }
    return createTreeElementNode(node, prev, nextLink);
}

function createTreeElementNode(
    node: TreeNode,
    prev?: TreeElementNode,
    next?: TreeNode
): TreeElementNode {
    let linkedSiblings: TreeElementNode[] = [];
    let linkedNext: TreeElementNode | undefined;

    if (node.children && node.children.length > 0) {
        linkedSiblings = node.children.slice(1).map(function (sibling) {
            return linkNodes(sibling, node);
        });
    }

    if (next) {
        linkedNext = linkNodes(next, node, linkedSiblings);
    }
    // TreelementNode对象不存在children字段
    delete node.children;

    return Object.assign(node, {
        prev,
        next: linkedNext
    });
}

export function findRootNode(
    node?: TreeElementNode
): TreeElementNode | undefined {
    if (!node) return;
    let rootNode: TreeElementNode = node;
    while (rootNode.prev) {
        rootNode = rootNode.prev as TreeElementNode;
    }
    return rootNode;
}
