import {NodeProps, TreeNode} from '../types';

export function createElement(
    type: string, props: NodeProps, children: Array<TreeNode>, ...others: Array<any>
): TreeNode {

    let key;
    // const ownedProps = {};

    if (props.key) {
        key = String(props.key);
    }

    if (others.length > 0) {
        children = children.concat(others);
    }

    return element(
        type,
        key,
        props,
        children
    );
}

export function element(
    type: string, key?: string | number, props?: NodeProps, children?: Array<TreeNode>
): TreeNode {

    return {
        type,
        key,
        props,
        children
    };
}
