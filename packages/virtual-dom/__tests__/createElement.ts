import { createElement, render, patch, diff } from '../src';
import { VNode } from '../types';

test('is function', () => {
  expect(typeof createElement === 'function').toEqual(true);
});

let node: VNode;
let bNode: VNode;

beforeEach(() => {
  node = createElement('div', {}, undefined, [
    createElement('div', { key: 1 }, undefined, []),
    createElement('div', { key: 2 }, undefined, []),
    createElement('div', { key: 3 }, undefined, [])
  ]);

  bNode = createElement('div', {}, undefined, [
    createElement('div', { key: 1 }, undefined, []),
    createElement('div', { key: 2 }, undefined, []),
    createElement('div', { key: 4 }, undefined, ['123', '456', '789'])
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

test('diff node', () => {
  const treeA = render(node);
  const patch = diff(treeA, bNode);

  console.log('patch ->', patch);
});
