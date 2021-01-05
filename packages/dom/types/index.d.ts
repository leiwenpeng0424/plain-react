import {TreeNode} from "@vvs/core";

export type TreeElementNode = {
    prev?: TreeElementNode;
    next?: TreeElementNode;
    siblings?: Array<TreeElementNode>;
    elem?: Element;
} & TreeNode;
export type TreeRootNode = {node: TreeElementNode; container: Element};
export type Tree = TreeElementNode & TreeRootNode;
