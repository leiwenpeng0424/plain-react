import { h } from '../src/h';

test('log the vnode', (done) => {
  const vnode = h('div.a.b.c.d#a#b#c#d#e#f#g', {}, [
    h('span', {}, ['name']),
    h('span', {}, ['name'])
  ]);

  console.log(vnode);
  done();
});
