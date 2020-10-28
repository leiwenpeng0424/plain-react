function createElement(
  element: string,
  props: Record<string, unknown>,
  children: unknown[]
): unknown {
  if (children === undefined) {
    children = [];
  }

  return {
    tag: element,
    props: props,
    $$typeof: element,
    children: children
  };
}

export { createElement };
