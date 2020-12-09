import {TreeElementNode, TreeNode, TreeRoot} from '@plain-react/core';
export type PropertyKey = string | number;
export type PropertyValue = string | boolean | number;
export type Attrbutes = Record<PropertyKey, PropertyValue>;
export type DomEvents = Record<string, () => void>;
export type TreeRoot = {
    container: Element;
    // rootNode: TreeElementRootNode;
};
export type TreeElementRootNode = {
    root: TreeRoot;
} & TreeElementNode;
export default function render(node: TreeNode, element: Element): void;
