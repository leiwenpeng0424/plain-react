export interface VNode {
  tag: string;
  attrs: { [index: keyof HTMLElement]: string; children?: VNode | Array<VNode> };
  children: Array<string | VNode>;
  [index: string]: unknown;
}

export type VTree = {
  pre: VNode;
  next: VNode;
} & VNode;

export function createElement(
  element: unknown,
  props: { [index: string]: unknown },
  children?: VNode[]
): VNode;
