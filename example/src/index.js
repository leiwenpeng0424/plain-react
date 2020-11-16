import { createElement, render } from '@plain-react/virtual-dom';

const node1 = createElement('div', {}, [
  createElement('h1', ['Hello World']),
  createElement('h2', ['Show Me The Money!!!']),
  createElement('div', [createElement('h3', ['lwp'])])
]);

const node2 = createElement('div', [
  createElement('h1', ['dlroW olleH']),
  createElement('h2', ['!!!yenoM ehT eM wohS']),
  createElement('div', [createElement('h3', ['leiwenpeng'])])
]);

render(node1);
render(node2);

document.getElementById('app').appendChild(node1.elem);
document.getElementById('app').appendChild(node2.elem);
