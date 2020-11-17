import {createElement, render, diff} from '@plain-react/virtual-dom';

const node1 = createElement('div', {}, [
  createElement('h1', ['Hello World']),
  createElement('h2', ['Show Me The Money!!!'])
]);

const node2 = createElement('div', [
  createElement('h1', ['Hello World']),
  createElement('h2', ['Show Me The Money!!!']),
  createElement('div', [
    createElement('div', {key: 2}, [
      createElement('h1', ['Hello World']),
      createElement('h2', ['Show Me The Money!!!']),
      createElement('div', [
        createElement('h3', ['lwp']),
        createElement('div', {}, [
          createElement('h1', ['Hello World']),
          createElement('h2', ['Show Me The Money!!!']),
          createElement('div', [createElement('h3', ['leiwenpeng'])])
        ])
      ])
    ]),
    createElement('h3', {key: 1}, ['leiwenpeng'])
  ])
]);

render(node1);
render(node2);

console.log(diff(node1, node2).updater);

document.getElementById('app').appendChild(node1.elem);
