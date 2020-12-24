/**
 * - 包装节点树, 从以children为关系的关联关系转换成一对一的上下关系
 *   使用next字段表示下级, 使用prev字段表示上级, siblings字段表示同级.
 *
 * -
 */

import {TreeNode} from '@vvs/core';
import {TreeElementNode, TreeRootNode} from '../types';

export function createContainer(
    node: TreeNode,
    container: Element
): TreeRootNode {
    const root = {
        node,
        container
    };

    return createLinkedNode(root);
}

function createLinkedNode(root: TreeRootNode): TreeRootNode {
    root.node = linkNode(root.node);
    return root;
}

/**
 *
 * 对传入的TreeNode添加属性
 *    - 连接 *prev*
 *    - 连接 *next*
 *    - 处理/连接 *siblings*, 从prev.children中读取siblings
 *    - 返回添加好属性的节点
 */
function linkNode(node: TreeNode, parent?: TreeElementNode): TreeElementNode {

    // 准备最后返回的对象.
    const elementNode: TreeElementNode = {
        ...node,
        prev: parent
    };

    // 读取当前节点的子节点数组
    const curChildren = node.children?.slice(0);

    if (curChildren) {

    }

    // 如果子节点存在, 调用link方法创建一个TreeElementNode.
    // 这是递归生生成ElementTree的关键.
    if (curChildren && Array.isArray(curChildren) && curChildren.length >= 1) {
        elementNode.next = linkNode(curChildren[0], elementNode);
    }

    if (
        parent
        && parent.children
        && Array.isArray(parent.children)
        && parent.children.length > 1
    ) {
        // 处理当前节点的siblings.
        // 如果上一个节点有没有siblings.
        // 只有当上一个节点存在children并且,不上与一个.
        const preChildren = parent.children.slice(0);

        elementNode.siblings = preChildren
            .slice(1)
            .map((child: TreeNode) => linkNode(child, elementNode));
    }

    return elementNode;
}

export function updateContainer(node: TreeElementNode): void {
    return;
}
