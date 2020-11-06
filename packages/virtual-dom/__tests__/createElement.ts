import { createElement, render, patch } from '../src';
import { VNode } from '../types';

test('is function', () => {
  expect(typeof createElement === 'function').toEqual(true);
});

let node: VNode;

beforeEach(() => {
  node = createElement('div', { props: {} }, undefined, [
    createElement('div', { props: {} }, undefined, []),
    createElement('div', { props: {} }, undefined, []),
    createElement('div', { props: {} }, undefined, ['123', '456', '789'])
  ]);
});

test('create vnode', () => {
  expect(node.tagName === 'div').toBeTruthy();
});

test('test render && patch', () => {
  const renderNode = render(node);
  // console.log('-->', renderNode);
  patch(renderNode);
  console.log('-->', renderNode.elem);
});
