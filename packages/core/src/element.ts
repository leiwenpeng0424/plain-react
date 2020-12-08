import {Props, TreeElementNode, TreeNode, TreeNodeChildren, TreeRoot} from '../types';

export function createTreeNode(
    name: string,
    key?: string | number,
    props?: Props,
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

export function createTreeRoot(node: TreeNode, dom: Element): TreeRoot {
    const treeElementNode = linkNodes(node);
    const root: TreeRoot = {
        container: dom,
        rootNode: treeElementNode
    };
    treeElementNode.root = root;
    return root;
}

function linkNodes(node: TreeNode, prev?: TreeNode): TreeElementNode {
    let nextLink, linkSiblings;

    if (node.children && Array.isArray(node.children)) {
        nextLink = node.children[0];
        linkSiblings = node.children.slice(1);
    }

    return createTreeElementNode(node, prev, nextLink, linkSiblings);
}

function createTreeElementNode(
    node: TreeNode,
    prev?: TreeNode,
    next?: TreeNode,
    siblings?: TreeNode[]
): TreeElementNode {
    let linkedSiblings: TreeElementNode[] = [];

    if (siblings && siblings.length > 0) {
        linkedSiblings = siblings.map(function (sibling) {
            return linkNodes(sibling, prev);
        });
    }

    return {
        ...node,
        prev,
        next,
        siblings: linkedSiblings
    };
}
