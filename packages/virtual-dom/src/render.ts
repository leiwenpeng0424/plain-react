import {DocRelatedOptions, VNode} from '../types';
import {createElem} from './dom-utils';

export default function render(node: VNode, dom: Element): void {
    const docOpts: DocRelatedOptions = {
        doc: dom.ownerDocument
    };

    const {name, data, children} = node;

    const elem = createElem(name, data?.props, docOpts);

    dom.appendChild(node.elem as Element);
}
