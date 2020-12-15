import {TreeNode} from '../types';

export function textNode(text: string) {
    return {
        text
    };
}

export function isTextNode(node: TreeNode): boolean {
    return typeof node === 'string';
}
