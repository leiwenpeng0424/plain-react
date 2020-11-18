import { createElement, render, diff } from '@plain-react/virtual-dom';

const node1 = createElement('div', {}, [
  createElement('h1', { key: 'key1' }, ['Hello World']),
  createElement('h2', { key: 'key2' }, ['Hello World']),
  createElement('h3', { key: 'key3' }, ['Hello World']),
  createElement('h4', { key: 'key4' }, ['Hello World']),
]);

const node2 = createElement('div', [
  createElement('h2', { key: 'key2' }, ['Hello World']),
  createElement('h1', { key: 'key1' }, ['Hello World']),
  createElement('h4', { key: 'key4' }, ['Hello World']),
  createElement('h3', { key: 'key5' }, ['Hello World']),
]);

render(node1);
render(node2);

console.log(diff(node1, node2).updater);

document.getElementById('app').appendChild(node1.elem);
