import {createTreeNode, createTreeRootNode} from '@plain-react/core';

test('test create node', (done) => {
    const nodes = createTreeNode('div', 1, {}, [
        createTreeNode('span', 2, {}, []),
        createTreeNode('span', 3, {}, [createTreeNode('span', 4, {}, [])]),
        createTreeNode('span', 5, {}, [])
    ]);

    // console.log('nodes -->', nodes);

    const root = createTreeRootNode(nodes);

    console.log(root, root.rootNode, root.next);

    done();
});
