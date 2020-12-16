import Render from '@plain-react/dom';
import {createTreeNode} from '@plain-react/core';

const node1 = createTreeNode('div', 1, {}, [
    createTreeNode(
        'h1',
        2,
        {
            attrs: {
                style: 'color:cyan',
                class: 'classname'
            }
        },
        ['Hello World']
    ),
    createTreeNode(
        'h2',
        3,
        {
            attrs: {
                style: 'color: red'
            }
        },
        ['Hello World']
    ),
    createTreeNode(
        'h3',
        4,
        {
            attrs: {
                style: 'color: green'
            }
        },
        ['Hello World']
    ),
    createTreeNode(
        'h4',
        5,
        {
            attrs: {
                style: 'color: yellow'
            }
        },
        ['Hello World']
    )
]);
/**
const node2 = createTreeNode('div', [
    createTreeNode('h3', {key: '3'}, ['Hello World']),
    createTreeNode('h2', {key: '2'}, ['Hello World']),
    createTreeNode('h1', {key: '1'}, ['Hello World'])
]);
 **/
Render(node1, document.getElementById('app'));
