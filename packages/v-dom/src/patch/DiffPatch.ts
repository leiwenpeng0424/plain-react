import Patch from './Patch';

export default class DiffPatch extends Patch {
  diff = (): void => console.log('diff');
}
