import { createElement, render, patch } from '@plain-react/virtual-dom';

const node = createElement('div', {}, undefined, [
  createElement(
    'h1',
    { classes: { a: true, b: true, c: true, d: true }, id: 'aaa' },
    undefined,
    ['Hello World']
  ),
  createElement('h2', {}, undefined, ['Show Me The Money!!!']),
  createElement('div', {}, undefined, [
    createElement('h3', {}, undefined, ['lwp'])
  ])
]);

render(node);
patch(node);

console.log(node);

document.body.appendChild(node.elem);
