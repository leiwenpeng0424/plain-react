export type NodeProps = {
    key?: number, string;
    [index: string]: any;
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

export function createElement(name: string | ElementFunction): void;
export function createElement(name: string | ElementFunction, props: any): void;
export function createElement(name: string | ElementFunction, props: any, children: []): void;
export function createElement(name: string | ElementFunction, props: any, children: [], ...others: Array[any]): void;
