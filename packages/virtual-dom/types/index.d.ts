export interface VNodeData {
  id?: string;
  key?: string | number;
  style?: Record<string, string>;
  classes?: Record<string, boolean>;
  [index: string]: unknown;
}

export type VNode = {
  type: symbol;
  data: VNodeData;
  children: VNodeChildren;
  elem?: Node;
  tagName?: string | VNode;
};

export type PossibleChildren = (VNode | string | number | boolean | undefined | null)[];
export type VNodeChildren = VNode[];

export function createElement(tagName: string | VNode): VNode;
export function createElement(tagName: string | VNode, data: VNodeData): VNode;
export function createElement(tagName: string | VNode, children: VNodeChildren): VNode;
export function createElement(
  tagName: string | VNode,
  data: VNodeData,
  children: VNodeChildren
): VNode;

export function render(node: VNode): VNode;
export function diff(a: VNode, b: VNode): Patch;
