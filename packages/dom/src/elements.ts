import {
    TreeElementNode,
    findRootNode as findTreeRootNode
} from '@plain-react/core';
import {Attrbutes, DomEvents, TreeElementRootNode, TreeRoot} from '../types';

let ownDoc: Document;
let rootNode: TreeElementNode;

export function createElement(node: TreeElementNode): Element {
    if (!rootNode) {
        rootNode = findTreeRootNode(node);
        ownDoc = ((rootNode as TreeElementRootNode).root as TreeRoot).container
            .ownerDocument;
    }

    const {name, props} = node;
    node.elem = createDomElement(
        name,
        props?.namespace,
        props?.attrs,
        props?.events
    );
    return node.elem;
}
export function createFragment(): DocumentFragment {
    return ownDoc.createDocumentFragment();
}

export function appendToParent(
    parent: Element | DocumentFragment | Document,
    child: Element | DocumentFragment
): void {
    parent.appendChild(child);
}

function createDomElement(
    tagName: string,
    namespace: string | undefined,
    attrs: Attrbutes = {},
    events: DomEvents = {}
): Element {
    let elem: Element;
    if (namespace) {
        elem = ownDoc.createElementNS(namespace, tagName);
    } else {
        elem = ownDoc.createElement(tagName);
    }

    appendAttrs(elem, attrs);
    appendEvents(elem, events);

    return elem;
}

function appendAttrs(elem: Element, attrs: Attrbutes): void {
    for (const key in attrs) {
        if (Object.prototype.hasOwnProperty.call(attrs, key)) {
            elem.setAttribute(key, attrs[key] as string);
        }
    }
}

function appendEvents(elem: Element, events: DomEvents) {
    for (const eventName in events) {
        if (Object.prototype.hasOwnProperty.call(events, eventName)) {
            elem.addEventListener(eventName, events[eventName]);
        }
    }
}
