export type NodeProps = {
    key?: number | string;
}

export type TreeNode = {
    type: string;
    key?: string | number;
    props?: NodeProps;
    children?: TreeNode[];
    ref?: any;
}

export type TreeNodeRoot = {
    rootNode: TreeNode;
} & TreeNode;

export type ElementFunction = () => TreeNode;

export function createElement(name: string | ElementFunction, props?: NodeProps, children?: []): void;
