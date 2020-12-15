import Render from '@plain-react/dom';
import {createTreeNode} from '@plain-react/core';

const node1 = createTreeNode('div', 1, {}, [
    createTreeNode(
        'h1',
        2,
        {
            key: '1',
            attrs: {
                style: 'color:cyan'
            }
        },
        ['Hello World']
    ),
    createTreeNode('h2', 3, {key: '2'}, []),
    createTreeNode('h3', 4, {key: '3'}, []),
    createTreeNode('h4', 5, {}, [])
]);
/**
const node2 = createTreeNode('div', [
    createTreeNode('h3', {key: '3'}, ['Hello World']),
    createTreeNode('h2', {key: '2'}, ['Hello World']),
    createTreeNode('h1', {key: '1'}, ['Hello World'])
]);
 **/
Render(node1, document.getElementById('app'));
