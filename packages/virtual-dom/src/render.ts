import {DocRelatedOptions, VNode, VNodeChildren} from '../types';
import {createElem, createChildFragment} from './dom-utils';

// 这一步需要采用阻塞的渲染.
export default function render(node: VNode, dom: Element): void {
    const docOpts: DocRelatedOptions = {
        doc: dom.ownerDocument
    };
	createElement(node, docOpts);
	
    dom.appendChild(node.elem as Element)
}

function createElement(node: VNode, options: DocRelatedOptions):Element {
	const {
		name, data, children
	} = node;

	const elem = createElem(name, data?.props, options);

	if (children) {
		renderChild(children, elem, options)
	}

	return elem;
}

// 处理children, 与createElement方法形成一个调用组合,遍历完所有的节点.
function renderChild(child: VNodeChildren, parent: Element, options: DocRelatedOptions):void {
	const childFragment = createChildFragment(options);

	let tabIndex = 0;

	while (tabIndex < child.length) {
		const childNode = child[tabIndex];
		// 这里继续创建elem, 如果这个节点还有children,那就会优先便利子节点知道没有子节点为止.
		childNode.elem = createElement(childNode, options);
		childFragment.appendChild(childNode.elem);
		tabIndex++;
	}

	parent.appendChild(childFragment);
}

