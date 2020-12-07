export type VNode = {
    name: keyof HTMLElementTagNameMap;
    elem?: Element;
    data?: VNodeData;
    children?: VNodeChildren;
    [index: string]: unknown;
};

export type VNodeData = {
    key?: string | number;
    props?: ElementProperty;
    [index: string]: unknown;
};

export type VNodeChildren = VNode[];
export type ElementKey = string | number | undefined;
export interface ElementProperty {
    [index: string]: string;
}
export type DocRelatedOptions = {
    doc: Document;
};

export function h(name: string): VNode;
export function h(name: string, data: VNodeData): VNode;
export function h(name: string, children: VNodeChildren): VNode;
export function h(name: string, data: VNodeData, children: VNodeChildren): VNode;
