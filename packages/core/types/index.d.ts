export type TreeNode = {name: string; key: string | number; [index: string]: unknown};
export type TreeRoot = {container: Element; root: TreeNode};
export type TreeNodeChildren = TreeNode[] | undefined;
export type Props = {
    attrs: Record<string, unknown>;
    [index: string]: unknown;
};

export function createTreeNode(
    name: string,
    key: string | number,
    props: Props,
    children: TreeNodeChildren
): TreeNode;

export function createRootNode(node: TreeNode, dom: Element): TreeRoot;
