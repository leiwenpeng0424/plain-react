import { createElement, render, patch, diff } from '../src';
import { VNode } from '../types';

test('is function', () => {
  expect(typeof createElement === 'function').toEqual(true);
});

let node: VNode;
let bNode: VNode;

beforeEach(() => {
  node = createElement('div', { props: {} }, undefined, [
    createElement('div', { props: {}, key: 1 }, undefined, []),
    createElement('div', { props: {}, key: 2 }, undefined, []),
    createElement('div', { props: {}, key: 3 }, undefined, [])
  ]);

  bNode = createElement('div', { props: {} }, undefined, [
    createElement('div', { props: {}, key: 1 }, undefined, []),
    createElement('div', { props: {}, key: 2 }, undefined, []),
    createElement('div', { props: {}, key: 4 }, undefined, [
      '123',
      '456',
      '789'
    ])
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
  const treea = render(node);
  const treeb = render(bNode);

  const patch = diff(treea, treeb);

  console.log('patch ->', patch);
});
