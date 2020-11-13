export interface VNodeData {
  id?: string;
  key?: string | number;
  style?: Record<string, string>;
  classes?: Record<string, boolean>;
  [index: string]: any;
}

export type VNode = {
  tagName?: string;
  data?: VNodeData;
  text?: string;
  elem?: Node | Element;
  children?: VNodeChildren;
};

export type RenderOptions = {
  doc?: Document;
  target?: Node;
};

export type EffectTypes = 'ADD' | 'REMOVE' | 'UPDATE' | 'REORDER';

export type Effect = {
  type: EffectTypes;
  [index: string]: any;
};

export type Patch = {
  node: VNode;
  effects: Effect[];
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

function createElement(
  tagName?: string,
  data?: VNodeData,
  text?: string,
  children?: VNodeChildren
): VNode;

function render(node: VNode, opts: RenderOptions = {}): VNode;

function patch(node: VNode): void;

export { createElement, render, patch, diff };
