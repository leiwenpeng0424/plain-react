import { VNode, VNodeChildren, VNodeData } from '../types';
import diff from './diff';
import commit from './commit-patch';
import render from './render';
import patch from './patch';

function createElement(
  tagName?: string,
  data?: VNodeData,
  text?: string,
  children?: VNodeChildren
): VNode {
  if (children) {
    if (!Array.isArray(children)) {
      children = [children];
    }

    children = children.map((child) => {
      if (typeof child === 'string') {
        return createElement(undefined, undefined, child, undefined);
      }

      return child;
    });
  }

  return { tagName, data, text, children };
}

export { createElement, render, patch, diff, commit };
