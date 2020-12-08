import {createTreeNode, createTreeRoot} from '@plain-react/core';

test('test create node', (done) => {
    const nodes = createTreeNode('div', 1, {}, [
        createTreeNode('span', 2, {}, []),
        createTreeNode('span', 3, {}, [createTreeNode('span', 4, {}, [])]),
        createTreeNode('span', 5, {}, [])
    ]);

    console.log('nodes -->', nodes);

    const root = createTreeRoot(nodes, document.getElementById('root') as Element);

    console.log(root, root.rootNode, root?.rootNode?.siblings?.[0]);

    done();
});
