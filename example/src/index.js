import { render } from '@plain-react/dom';
import { createElement } from '@plain-react/core';

render(
  document.getElementById('app'),
  createElement(
    'div',
    {
      style: {
        color: 'cyan',
        textAlign: 'center',
        width: 400 * 0.618,
        height: 400
      },
      children: []
    },
    [
      createElement('p', { style: { color: 'yellow' } }),
      createElement('p', { style: { color: 'blue' } }),
      createElement('p', { style: { color: 'red' } })
    ]
  )
);
