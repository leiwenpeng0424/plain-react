import {
    createTreeNode,
    createTreeRootNode,
    findRootNode
} from '@plain-react/core';

test('test create node', (done) => {
    const nodes = createTreeNode('div', 1, {}, [
        createTreeNode('span', 2, {}, []),
        createTreeNode('span', 3, {}, [createTreeNode('span', 4, {}, [])]),
        createTreeNode('span', 5, {}, [])
    ]);

    // console.log('nodes -->', nodes);
    // const root = createTreeRoot(nodes, document.getElementById('root') as Element);
    // console.log(root, root.rootNode, root?.rootNode?.next?.siblings?.[0]?.next);

    done();
});

test('findRootNode', () => {
    const a = createTreeNode('div', 1, {}, []);
    const b = createTreeNode('div', 2, {}, []);
    const c = createTreeNode('div', 3, {}, []);
    const d = createTreeNode('div', 4, {}, [b]);
    const nodes = createTreeNode('div', 5, {}, [a, b, c, d]);

    const root = createTreeRootNode(nodes);
    console.log(root);
    console.log(findRootNode(root.next));
});
