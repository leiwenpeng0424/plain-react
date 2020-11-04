import DomApi from '../dom/dom';
import Patch from '../patch/Patch';
import { svg_namespace } from '../h';
import TextNode from './TextNode';
import SvgNode from './SvgNode';

export interface VNodeData {
  key?: string | number;
  attrs?: Record<string, string>;
  props?: Record<string, string>;
  ids?: string[];
  classes?: string[];
  [index: string]: unknown;
}

export type VNodeChildNode = (
  | VNode
  | TextNode
  | SvgNode
  | string
  | number
  | undefined
  | null
)[];

export default class VNode {
  domAPi?: DomApi;
  tagName?: string;
  data?: VNodeData;
  element?: Element;
  children?: VNodeChildNode;

  constructor(tagName?: string, data?: VNodeData, children?: VNodeChildNode) {
    this.tagName = tagName;
    this.data = data;
    this.children = children;
    this.domAPi = new DomApi();
  }

  create = (): Element => {
    const { tagName, data } = this;
    const { classes, ids } = data;

    this.element = this.domAPi.createElement(tagName);
    classes.forEach((clazz) => {
      if (this.data.namespace) {
        this.element.setAttributeNS(svg_namespace, 'class', clazz);
      } else {
        this.element.setAttribute('class', clazz);
      }
    });
    ids.forEach((id) => {
      if (this.data.namespace) {
        this.element.setAttributeNS(svg_namespace, 'id', id);
      } else {
        this.element.setAttribute('id', id);
      }
    });

    return this.element;
  };

  destory = (): void => {
    this.domAPi.removeChild(this.element);
  };

  update = (newNode: VNode): Patch => {
    return {
      type: 'ADD',
      node: this,
      effect: newNode
    };
  };
}
