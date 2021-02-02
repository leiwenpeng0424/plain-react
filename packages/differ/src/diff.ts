import { BaseElement } from "@core/src";
import { Patch } from "@differ/src/patch";

let workingElementNode: BaseElement | undefined;

export default function diff(node: BaseElement, patches: Patch[]) {
  if (patches.length !== 0) {
    console.warn("Still have un-commit patches");
  }

  if (workingElementNode !== undefined) {
    console.warn("There is a diff process in progress");
  }

  const { elem, children, props, type } = node;

  if (elem) {
    patches.push({ tag: "Insertion", node });
  }
}
