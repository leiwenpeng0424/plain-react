export type NodeProps = {
    state?: Record<string, string | number>;
    attrs?: Record<string | number, string>;
    events?: Record<string, () => void>;
    children?: (TreeNode | TreeElementNode)[];
    namespace?: string;
};
export type TreeNode = {
    name?: string;
    key?: string | number;
    children?: TreeNodeChildren;
    props?: NodeProps;
};
export type TreeElementNode = {
    prev?: TreeElementNode | TreeElementRootNode;
    next?: TreeElementNode;
    elem?: Element | Text | Comment;
    siblings?: TreeElementNode[];
    text?: string;
    [index: string]: unknown;
} & Omit<TreeNode, 'children'>;
// tree root

export type TreeNodeChildren = TreeNode[] | undefined;

export function createTreeNode(
    name: string,
    key: string | number,
    props: Props,
    children: TreeNodeChildren
): TreeNode;

export function createTreeRootNode(node: TreeNode): TreeElementNode;

export function findRootNode(node?: TreeElementNode): TreeElementNode;
