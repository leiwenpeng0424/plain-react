import { BaseElement } from "@core/src";

type PatchTags =
  | "Replacement"
  | "Movement"
  | "Reorder"
  | "Update"
  | "Remove"
  | "Insertion";

export type Patch = {
  tag: PatchTags;
  node: BaseElement;
};

export type Patches = Patch[];

export default function patch(patches: Patches) {
  console.log("patch to virtual-dom");
}
