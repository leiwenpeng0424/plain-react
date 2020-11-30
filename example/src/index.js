import {createElement, render, diff} from '@plain-react/virtual-dom';

const node1 = createElement('div', {}, [
  createElement('h1', {key: '1'}, ['Hello World']),
  createElement('h2', {key: '2'}, ['Hello World']),
  createElement('h3', {key: '3'}, ['Hello World']),
  createElement('h4', ['Hello World'])
]);

const node2 = createElement('div', [
  createElement('h3', {key: '3'}, ['Hello World']),
  createElement('h2', {key: '2'}, ['Hello World']),
  createElement('h1', {key: '1'}, ['Hello World'])
]);

render(node1);
render(node2);

console.log(diff(node1, node2).updater);

document.getElementById('app').appendChild(node1.elem);
