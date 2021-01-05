import {NodeProps, TreeNode} from "../types";

/**
 * [createElement description]
 * @param  {string}          type     [description]
 * @param  {NodeProps}       props    [description]
 * @param  {Array<TreeNode>} children [description]
 * @return {TreeNode}                 [description]
 */
export function createElement(
    type: string,
    props?: NodeProps,
    children?: Array<TreeNode>
): TreeNode {
    let key;
    // const ownedProps = {};

    if (props && props.key) {
        key = String(props.key);
    }

    if (props && Array.isArray(props)) {
        children = props as Array<TreeNode>;
        props = undefined;
    }

    return element(type, key, props, children);
}

/**
 * [element description]
 * @param  {string}          type     [description]
 * @param  {string|number}   key      [description]
 * @param  {NodeProps}       props    [description]
 * @param  {Array<TreeNode>} children [description]
 * @return {TreeNode}                 [description]
 */
export function element(
    type: string,
    key?: string | number,
    props?: NodeProps,
    children?: Array<TreeNode>
): TreeNode {
    return {
        type,
        key,
        props,
        children
    };
}
