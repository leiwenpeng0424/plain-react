import { BaseRenderer } from "@renderer/src/BaseRenderer";
import { BaseElement } from "@core/src";
import { Patches } from "@differ/src/patch";

type RenderCallback = () => void;

export class DomRenderer extends BaseRenderer<Node> {
  isRendering = false;
  patches: Patches;

  constructor(node: BaseElement, container: Node) {
    super(node, container);
    this.patches = [];
  }

  render(callback?: RenderCallback): void {}
}
