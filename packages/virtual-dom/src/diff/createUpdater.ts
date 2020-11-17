// create update
import {Updater, VNode} from '../../types';

export default function createUpdater(node: VNode): Updater {
  return {
    node,
    effects: []
  };
}
