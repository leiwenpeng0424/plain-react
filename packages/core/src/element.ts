import {Props, TreeNode, TreeNodeChildren, TreeRoot} from '../types';

export function createTreeNode(
    name: string,
    key: string | number,
    props: Props,
    children: TreeNodeChildren
): TreeNode {
    return {
        name,
        key,
        props,
        children
    };
}

export function createRootNode(node: TreeNode, dom: Element): TreeRoot {
    return {
        root: node,
        container: dom
    };
}
