import { patch, createTree, createNode } from '../src/index';

test('should be a function', () => {
  expect(typeof patch).toEqual('function');
  expect(typeof createTree).toEqual('function');
  expect(typeof createNode).toEqual('function');
});

test('should return a single js dom object', () => {
  const node = createNode('div', {
    style: 'background:"red";width: 150px;height: 150px'
  });
  expect(node.tagName).toEqual('div');
  expect(node.props).toEqual({ style: 'background:"red";width: 150px;height: 150px' });
  expect(node.children).toBeUndefined();
});

test('should return a js dom, with 2 child', (done) => {
  const node = createNode(
    'div',
    {
      style: "border: '1px solid red'"
    },
    [
      createNode('h1', {}, [
        createNode('h2', {}, [
          createNode('h3', {}, [
            createNode('h4', {}, [
              createNode('h5', {}, [createNode('h6', {}, [createNode('h7', {})])])
            ])
          ])
        ])
      ]),
      createNode('h2', {}, [
        createNode('h3', {}, [
          createNode('h4', {}, [
            createNode('h5', {}, [createNode('h6', {}, [createNode('h7', {})])])
          ])
        ])
      ])
    ]
  );
  expect(node.children.length).toBeGreaterThanOrEqual(1);
  const tree = createTree(node);
  console.log(tree);

  console.log(tree.next.siblings);

  done();
});
