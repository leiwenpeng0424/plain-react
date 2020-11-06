import { RenderOptions, VNode, VNodeChildren, VNodeData } from '../types';

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

function getGlobalDocument(): Document {
  return window.document;
}

function appendChild(parent: VNode, node: VNode): void {
  parent.elem?.appendChild(patch(node).elem as Node);
}

// 处理样式
function styles(node: VNode): void {
  const { data: { style = {} } = {} } = node;
  for (const key in style) {
    if (Object.prototype.hasOwnProperty.call(style, key)) {
      (node.elem as Element).setAttribute(key, style[key]);
    }
  }
}

// 处理类名
function classes(node: VNode): void {
  const { data: { classes } = {} } = node;
  if (!classes) return;
  const clazzString: string[] = [];
  for (const key in classes) {
    if (Object.prototype.hasOwnProperty.call(classes, key)) {
      // 如果是trusty，就添加上class
      if (classes[key]) {
        clazzString.push(key);
      }
    }
  }

  if (node.tagName) {
    (<Element>node.elem).setAttribute('class', clazzString.join(' '));
  }
}

// 处理id
function ids(node: VNode): void {
  const { data: { id } = {} } = node;
  if (!id) return;

  if (node.tagName) {
    (<Element>node.elem).setAttribute('id', id);
  }
}

const Modules = [classes, ids, styles];

function render(node: VNode, opts: RenderOptions = {}): VNode {
  if (!opts?.doc) {
    opts.doc = getGlobalDocument();
  }

  const doc = opts.doc;

  const { children } = node;

  if (!node.tagName) {
    node.elem = doc.createTextNode(node.text as string);
  } else {
    node.elem = doc.createElement(node.tagName);
  }

  Modules.forEach((module) => module(node));

  if (children) {
    children.forEach((child): void => {
      render(child as VNode, opts);
    });
  }

  return node;
}

function patch(node: VNode): VNode {
  const { children } = node;
  if (children) {
    (children as VNode[]).forEach((child) => {
      appendChild(node, child);
    });
  }

  return node;
}

export { createElement, render, patch };
