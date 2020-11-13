import {
  createElement,
  render,
  patch,
  diff,
  commit
} from '@plain-react/virtual-dom';

const node1 = createElement('div', {}, undefined, [
  createElement('h1', { key: 1 }, undefined, ['Hello World']),
  createElement('h2', { key: 2 }, undefined, ['Show Me The Money!!!']),
  createElement('div', { key: 3 }, undefined, [
    createElement('h3', { key: 4 }, undefined, ['lwp'])
  ])
]);

const node2 = createElement('div', {}, undefined, [
  createElement('h1', { key: 1 }, undefined, ['Hello World']),
  createElement('h2', { key: 2 }, undefined, ['Show Me The Money!!!']),
  createElement('div', { key: 3 }, undefined, [
    createElement('h3', { key: 4 }, undefined, ['leiwenpeng'])
  ])
]);

render(node1);
patch(node1);

document.body.appendChild(node1.elem);

setTimeout(() => {
  const patch = diff(node2, node1);
  commit(patch);
  console.log(patch);
}, 1000);
