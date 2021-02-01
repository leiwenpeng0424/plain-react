import { BaseRenderer } from "@renderer/src/BaseRenderer";
import { BaseElement } from "@core/src/BaseElement";

type RenderCallback = () => void;
type PatchTags =
  | "Replacement"
  | "Movement"
  | "Reorder"
  | "Update"
  | "Remove"
  | "Insertion";
type Patch = {
  tag: PatchTags;
  node: BaseElement;
};
type Patches = Array<Patch>;

export class DomRenderer extends BaseRenderer<Node> {
  isRendering = false;
  patches: Patches;

  constructor(node: BaseElement, container: Node) {
    super(node, container);
    this.patches = [];
  }

  render(callback?: RenderCallback): void {
    this.patches = [];
    this.updateContainer(callback);
  }
  updateContainer(callback?: RenderCallback): void {
    const { __element_root__: node } = this.root;

    this.diff(node);
    this.patch(callback);
  }

  diff(node: BaseElement): Patches {
    if (!node.elem) {
      this.patches.push({ tag: "Insertion", node });
    }

    return this.patches;
  }

  patch(cb?: RenderCallback): void {
    if (this.patches.length !== 0) {
    }
  }
}
