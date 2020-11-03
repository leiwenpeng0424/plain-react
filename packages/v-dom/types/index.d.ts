export type ElementTypes = 'TEXT' | 'NODE' | 'TREE';

export interface VNode {
  type: ElementTypes;
  tagName: string;
  props: { [index: keyof HTMLElement]: string; children?: VNode | Array<VNode> };
  children?: VNodeChild[];
  [index: string]: unknown;
}

export type VTree = {
  prev: VNode;
  next: VTree;
  node: VNode;
  siblings?: VNode[];
};

export type PatchType = 'REMOVE' | 'REORDER' | 'ADD' | 'ATTRS';

export type VPatch = {
  type: PatchType;
  tree: VTree;
};

export type Attrs = { [index: string]: string };

export type VNodeChild = VNode;
