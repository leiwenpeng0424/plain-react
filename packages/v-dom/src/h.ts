import VNode, { VNodeChildNode } from './node/VNode';
import TextNode from './node/TextNode';

export const svg_namespace = 'http://www.w3.org/2000/svg';

export function h(
  selector: string,
  props?: Record<string, unknown>,
  children?: VNodeChildNode
): VNode {
  if (typeof selector !== 'string') {
    throw new TypeError('not a valid selector' + ' ' + selector);
  }

  if (!props) props = {};
  if (!children) children = [];
  if (!Array.isArray(children)) children = [children];

  if (selector.startsWith('svg') && (selector[3] === '.' || selector[3] === '#')) {
    // 是一个svg声明
    props.namespace = svg_namespace;
    children = children.map((child) => {
      if (!(child instanceof VNode)) {
        child = new TextNode(child as string);
      }

      return child;
    });
  }

  let classes, ids, tagName;
  const sharp = selector.indexOf('#');
  const dot = selector.indexOf('.');

  if (sharp > dot) {
    tagName = selector.slice(0, dot);
    ids = selector.slice(dot + 1, sharp).split('.');
    classes = selector.slice(sharp + 1).split('#');
  } else {
    tagName = selector.slice(0, sharp);
    ids = selector.slice(dot + 1).split('#');
    classes = selector.slice(sharp + 1, dot).split('.');
  }

  if (sharp === dot) {
    tagName = selector.slice(0);
  }

  props.ids = ids;
  props.classes = classes;

  return new VNode(tagName, props, children);
}
