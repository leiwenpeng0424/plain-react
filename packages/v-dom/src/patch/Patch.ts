import VNode from '../node/VNode';

type PatchTypes = 'ADD' | 'REMOVE' | 'REORDER';

export default class Patch {
  type: PatchTypes;
  node: VNode;
  effect: VNode;
}
