import { BaseElement } from "@jsx/src/element";

export interface ClassElement extends BaseElement {
  ctor: () => void;
}
