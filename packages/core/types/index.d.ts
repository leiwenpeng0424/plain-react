export type TreeNode = {
    name: string;
    key?: string | number;
    children?: TreeNodeChildren;
    [index: string]: unknown;
};
// normal tree element node
export type TreeElementNode = {
    prev?: TreeElementNode | TreeRoot;
    next?: TreeElementNode;
    elem?: Element;
    siblings?: TreeElementNode[];
} & TreeNode;
// root element node
export type TreeElementRootNode = {
    root: TreeRoot;
} & TreeElementNode;
// tree root
export type TreeRoot = {container: Element; rootNode: TreeElementNode};

export type TreeNodeChildren = TreeNode[] | undefined;

export type Props = {
    attrs?: Record<string, unknown>;
    [index: string]: unknown;
};

export function createTreeNode(
    name: string,
    key: string | number,
    props: Props,
    children: TreeNodeChildren
): TreeNode;
export function createTreeNode(name: string, key: string | number, data: Props): TreeNode;
export function createTreeNode(
    name: stirng,
    key: stirng | number,
    children: TreeNodeChildren
): TreeNode;
export function createTreeNode(name: string, key: string | number): TreeNode;
export function createTreeNode(name: string): TreeNode;

export function createTreeRoot(node: TreeNode, dom: Element): TreeRoot;
