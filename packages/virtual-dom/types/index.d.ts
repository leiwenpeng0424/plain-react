export type VNode = {
  name: string;
  [index: string]: unknown;
};

export type VNodeData = {
  key?: string | number;
  [index: string]: unknown;
};

export type VNodeChildren = VNode[];

// 不同的函数定义
export function createElement(name: string): VNode;
export function createElement(name: string, data: VNodeData): VNode;
export function createElement(name: string, children: VNodeChildren): VNode;
export function createElement(
  name: string | VNode,
  data: VNodeData,
  children: VNodeChildren
): VNode;
