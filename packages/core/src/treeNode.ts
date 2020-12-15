import {NodeProps, TreeElementNode, TreeNode, TreeNodeChildren} from '../types';
import {isTextNode} from './textNode';

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
    // 如果根节点是一个textNode.
    if (isTextNode(node)) {
        return {
            text: (node as unknown) as string,
            prev
        };
    }
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
