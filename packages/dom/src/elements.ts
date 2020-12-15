import {
    TreeElementNode,
    findRootNode as findTreeRootNode
} from '@plain-react/core';
import {Attrbutes, DomEvents, TreeElementRootNode, TreeRoot} from '../types';

let ownDoc: Document;
let rootNode: TreeElementNode;

export function createElement(node: TreeElementNode): Element | Text {
    if (!rootNode) {
        rootNode = findTreeRootNode(node);
        ownDoc = ((rootNode as TreeElementRootNode).root as TreeRoot).container
            .ownerDocument;
    }

    const {name, props, text} = node;
    let elem: Element | Text;

    if (!name) {
        if (text != null) {
            elem = createTextElement(text);
        } else {
            elem = createTextElement('');
        }
    } else {
        elem = createDomElement(
            name,
            props?.namespace,
            props?.attrs,
            props?.events
        );
    }

    node.elem = elem;

    return elem;
}
export function createFragment(): DocumentFragment {
    return ownDoc.createDocumentFragment();
}

export function appendToParent(
    parent: Element | DocumentFragment | Document,
    child: Element | DocumentFragment | Text | Comment
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

function createTextElement(text: string): Text {
    return ownDoc.createTextNode(text);
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
