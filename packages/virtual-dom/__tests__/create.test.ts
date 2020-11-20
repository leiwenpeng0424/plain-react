import createElement from '../src/create';

it('should render a node tree', function () {
  let tree = createElement('div', []);
  tree = createElement('div', [createElement('div')]);
  tree = createElement('div', [
    createElement('div', [createElement('h1'), createElement('h1')]),
    createElement('div'),
    createElement('div'),
    'Hello World'
  ]);
  const childElement = createElement('div', {}, ['child1', 'child2', 'child3', 'child4', 'child5']);

  tree = createElement(childElement, [
    createElement('div', [createElement('h1'), createElement('h1')]),
    createElement('div'),
    createElement('div'),
    'Hello World'
  ]);

  expect(tree.children?.length).toEqual(9);
});
