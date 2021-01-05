/**
 * - 包装节点树, 从以children为关系的关联关系转换成一对一的上下关系
 *   使用next字段表示下级, 使用prev字段表示上级, siblings字段表示同级.
 *
 * -
 */

import {TreeNode} from '@vvs/core';
import {Tree, TreeElementNode, TreeRootNode} from '../types';

let doc: Document;

/**
 * @example
 *  - create root node
 * @param node
 * @param container
 */
export function createContainer(
    node: TreeNode,
    container: Element
): TreeRootNode {
    const root = {node,container};
    return createLinkedNode(root);
}

/**
 * 创建连接的节点
 * @param  {TreeRootNode} root [普通的节点]
 * @return {TreeRootNode}      [连接的节点]
 */
function createLinkedNode(root: TreeRootNode): TreeRootNode {
    root.node = linkNode(root.node);
    return root;
}

/**
 *
 * @example 对传入的TreeNode添加属性
 *  - 连接 *prev*
 *  - 连接 *next*
 *  - 处理/连接 *siblings*, 从prev.children中读取siblings
 *  - 返回添加好属性的节点
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

/**
 * @example
 *  - mount dom to root-container
 * @param node {TreeElementNode}
 */
export function updateContainer(node: TreeElementNode): void {
    const root = findTreeRootNode(node) as TreeRootNode;

    if(!doc || doc !== root.container.ownerDocument) {
        doc = root.container.ownerDocument;
    }
    renderRoot(root);
}

/**
 *
 * @example
 *  - let root = findRoot(node);
 * @param node
 */
export function findTreeRootNode(node: TreeElementNode): Tree | undefined {
    const prev = node.prev;
    if (!prev) {
        return node as Tree;
    } else {
        return findTreeRootNode(prev);
    }
}

/**
 * @example
 *  - const rootDom = renderRoot(root);
 * @param root
 */
function renderRoot(root: TreeRootNode) {
    const {node}   = root;
    const _rootDom = doc.createElement(
        node.type
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // _rootDom.__root__ = root;
    node.elem = _rootDom;
    renderIntoRootContainer(node.next, _rootDom);
}

/**
 * h
 * @param {TreeElementNode| undefined} node      [Vnode]
 * @param {Element| undefined}         container [DomElement]
 */
function renderIntoRootContainer(node: TreeElementNode| undefined, container: Element| undefined) {
    const prev = node?.prev;
    const siblings = prev?.siblings;
    const next = node?.next;
    let elem;

    if(container && node) {
        renderNodeElementIntoContainer(node, container);
        if(siblings) {
            renderSiblingsIntoConatiner(siblings, container);
        }

        if(next) {
            renderIntoRootContainer(next, elem);
        }
    }

}

/**
 * @example
 *  - render sibling-doms into parent-container
 * @param siblings
 * @param container
 */
function renderSiblingsIntoConatiner(siblings: Array<TreeElementNode>, container: Element|Document) {
    const fragment = doc.createDocumentFragment();
    for (const sibling of siblings) {
        fragment.appendChild(
            doc.createElement(sibling.type)
        );
    }
    container.appendChild(fragment);
}

/**
 * @example
 *  - render dom in to parent-container
 * @param node
 * @param container
 */
function renderNodeElementIntoContainer(
    node: TreeElementNode, container: Element | Document
) {
    if(!node.elem) {
        node.elem = doc.createElement(node.type);
    } else {
        // if(!container.contains(node.elem)) {
        //     container.appendChild(node.elem);
        // }
    }
}

/**
 * 创建真实的dom节点
 * @param  {TreeElementNode} node VNode
 * @return {Element}              Element
 */
function createNodeElement(node: TreeElementNode): Element | undefined {
    if(typeof node.type === 'function') {
        // node = node.type();
    }

    return void 0;
}
