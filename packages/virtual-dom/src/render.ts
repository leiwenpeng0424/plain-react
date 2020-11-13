import { RenderOptions, VNode } from '../types';

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

function getGlobalDocument(): Document {
  return window.document;
}

export default function render(node: VNode, opts: RenderOptions = {}): VNode {
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
