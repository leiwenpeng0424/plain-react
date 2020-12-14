import {createTreeNode, createTreeRootNode} from '@plain-react/core';
import render from '../src';
test('test render', (done) => {
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

    render(root, document.getElementById('root') as Element);
    done();
});
