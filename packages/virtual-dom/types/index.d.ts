export interface VNodeData {
  id?: string;
  key?: string | number;
  style?: Record<string, string>;
  classes?: Record<string, boolean>;
  [index: string]: any;
}

export type VNode = {
  type: symbol;
  tagName?: string | VNode;
  data: VNodeData;
  elem?: Node | Element;
  children?: VNodeChildren;
};

export type RenderOptions = {
  doc?: Document;
  target?: Node;
};

export type EffectTypes = 'ADD' | 'REMOVE' | 'UPDATE' | 'REORDER';

export type Effect = {
  type: symbol;
  data: Record<string, any>;
  [index: string]: any;
};

export type Updater = {
  effects: Effect[];
  node: VNode;
  prev?: Updater;
  next?: Updater;
};

export type Patch = {
  root: VNode;
  updater: Updater;
  [index: string]: any;
};

export type VNodeChildren = (
  | VNode
  | string
  | number
  | boolean
  | undefined
  | null
)[];

export function createElement(tagName: string | VNode): VNode;
export function createElement(tagName: string | VNode, data: VNodeData): VNode;
export function createElement(
  tagName: string | VNode,
  children: VNodeChildren
): VNode;
export function createElement(
  tagName: string | VNode,
  data: VNodeData,
  children: VNodeChildren
): VNode;

export function render(node: VNode): VNode;
export function diff(a: VNode, b: VNode): Patch;
