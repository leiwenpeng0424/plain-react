import {createElement} from '@vvs/core';
import render from '../src';

describe('create element tree by Node', () => {
    const node = createElement('div', [
        createElement('div', [
            createElement('div', [
                createElement('div', [
                    createElement('div', [])
                ])
            ]),
            createElement('div')
        ])
    ]);

    render(node, document.createElement('div'));

    test('render tree', () => {
        expect(node.type).toEqual('div');
    });
});
