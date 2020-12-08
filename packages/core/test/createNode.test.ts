import {createTreeNode} from '@plain-react/core';

test('test create node', (done) => {
    const nodes = createTreeNode('div', 1, {}, [
        createTreeNode('span', 2, {}, []),
        createTreeNode('span', 3, {}, [createTreeNode('span', 4, {}, [])])
    ]);

    console.log('nodes -->', nodes);
    done();
});
