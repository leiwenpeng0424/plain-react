import {DocRelatedOptions, ElementProperty} from '../types';

export function createElem(
    tagName: keyof HTMLElementTagNameMap,
    props: ElementProperty | undefined = {},
    opts: {doc: Document}
): Element {
    let elem: Element;
    const {namespace} = props;

    if (namespace) {
        elem = opts.doc.createElementNS(namespace, tagName);
    } else {
        elem = opts.doc.createElement(tagName);
    }

    for (const property in props) {
        if (Object.prototype.hasOwnProperty.call(props, property)) {
            addAttrs(elem, property, props[property]);
		}
    }

    return elem;
}

export function addAttrs(elem: Element, property: string, value: string, namespace?: string): void {
    namespace
        ? elem.setAttributeNS(namespace, property, value)
        : elem.setAttribute(property, value);
}


export function removeAttrs(elem: Element, property: string, namespace?: string): void {
    namespace ? elem.removeAttributeNS(namespace, property) : elem.removeAttribute(property);
}

export function updateAttrs(
    elem: Element,
    property: string,
    value: string,
    namespace?: string
): void {
    removeAttrs(elem, property, namespace);
    addAttrs(elem, property, value, namespace);
}

export function createChildFragment(opts: DocRelatedOptions): DocumentFragment {
    return opts.doc.createDocumentFragment();
}
