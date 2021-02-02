import { BaseElement } from "@core/src";

export class BaseRoot<T> {
  containerInfo: T;
  __element_root__: BaseElement;

  constructor(elementNode: BaseElement, container: T) {
    this.containerInfo = container;
    this.__element_root__ = elementNode;
  }
}

export class BaseRenderer<T> {
  root: BaseRoot<T>;

  constructor(rootNode: BaseElement, container: T) {
    this.root = this.createRoot<T>(container, rootNode);
  }

  protected createRoot<T>(container: T, elementNode: BaseElement): BaseRoot<T> {
    return new BaseRoot<T>(elementNode, container);
  }

  render(): void {
    console.info("Should Implement This Method For Each SubClasses");
  }
}
