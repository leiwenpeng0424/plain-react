function createElement(
  element: string,
  props: Record<string, unknown>,
  children: unknown[]
): unknown {
  if (children === undefined) {
    children = [];
  }

  return {
    type: '',
    origin: '',
    tag: element,
    props: props,
    element: element,
    children: children
  };
}

export { createElement };
