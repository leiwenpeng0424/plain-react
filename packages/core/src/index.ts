function createElement(
  element: string,
  props: Record<string, unknown>,
  children: unknown[],
): unknown {
  if (children === undefined) {
    children = [];
  }

  return {
    tag: element,
    $$typeof: element,
    props: props,
    children: children,
  };
}

export { createElement };
