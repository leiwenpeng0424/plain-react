import {createTreeNode, createTreeRootNode} from '@plain-react/core';

test('createTreeNode', (done) => {
    const nodes = createTreeNode('div', 1, {}, [
        createTreeNode('span', 2, {}, []),
        createTreeNode('span', 3, {}, [createTreeNode('span', 4, {}, [])]),
        createTreeNode('span', 5, {}, [])
    ]);
    // console.log('nodes -->', nodes);
    const root = createTreeRootNode(nodes);
    // console.log(root, root.rootNode, root.next);
    done();
});

test('createTreeRootNode', (done) => {
    const root = createTreeRootNode(
        createTreeNode('div', 1, {}, [
            createTreeNode('div', 2, {}, [
                createTreeNode('div', 3, {}, [createTreeNode('div', 4, {}, [])])
            ]),
            createTreeNode('div', 5, {}, [
                createTreeNode('div', 6, {}, [createTreeNode('div', 7, {}, [])])
            ])
        ])
    );
    console.log(root?.next?.siblings);
    done();
});
