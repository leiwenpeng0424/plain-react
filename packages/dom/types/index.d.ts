import {TreeNode} from '@vvs/core';

export type TreeElementNode = {
    prev?: TreeElementNode;
    next?: TreeElementNode;
    siblings?: Array<TreeElementNode>;
} & TreeNode;

export type TreeRootNode = {
    node: TreeElementNode;
    container: Element;
};
