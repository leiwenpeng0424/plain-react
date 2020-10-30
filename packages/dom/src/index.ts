import { VTree } from '@plain-react/core';

function patch(element: string, attrs: { [index: string]: string }): Node {
  return document.createElement(element, {});
}

function render(domElement: Element, elements: VTree): void {
  console.log('-->', elements);

  const domFragment = new DocumentFragment();
  const node = elements;

  // do {
  //   if (typeof node === 'string') {
  //     domFragment.append(node);
  //   } else {
  //     domFragment.append(patch(node.tag, node.attrs));
  //   }
  // } while (node.children);
  //
  // domElement.append(domFragment);
}

export { render };
