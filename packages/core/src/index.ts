import {VNode} from '../types';

function createElement(
  element: string,
  props: Record<string, string | VNode>,
  children?: (string | VNode)[]
): VNode {
  if (children === undefined) {
    children = [];
  }

  if ('children' in props) {
    children.push(props.children);
    delete props.children;
  }

  return {
    tag: element,
    attrs: props,
    children
  };
}

export {createElement};
