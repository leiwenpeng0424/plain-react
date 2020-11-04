const doc = window.document;

class DomApi {
  createElement = (tagName: string, opts?: ElementCreationOptions): Element =>
    doc.createElement(tagName, opts);
  removeChild = (element: Node): void => {
    doc.removeChild(element);
  };
  insertBefore = () => {};
  insertAfter = () => {};
  appendChild = () => {};
}

export default DomApi;
