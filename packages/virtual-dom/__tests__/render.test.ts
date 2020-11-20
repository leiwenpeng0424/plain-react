import render from '../src/render';
import createElement from '../src/create';

// const childElement = createElement('div', {}, [
//   'child1',
//   'child2',
//   'child3',
//   'child4',
//   'child5'
// ]);

const tree = createElement('div', [
  createElement('div', [createElement('h1'), createElement('h1')]),
  createElement('div'),
  createElement('div'),
  'Hello World'
]);

it('should return a dom tree', function () {
  const dom = render(tree);
  console.log(dom);
});
