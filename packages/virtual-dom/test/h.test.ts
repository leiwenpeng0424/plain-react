import {h} from '@plain-react/virtual-dom';

test('test hyperScript', (done) => {
    const node1 = h('div');
    const node2 = h('div', {className: 'show me the money'});
    const node3 = h('div', [h('span')]);
    const node4 = h('div', {id: 'root'}, [h('span')]);

    console.log(node1, node2, node3, node4);

    done();
});
