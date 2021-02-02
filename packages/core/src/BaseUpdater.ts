// import { State_Props } from "@core/src/BaseClass";

export type UpdateCallBack = () => void;

export class UpdateQueue {
  pending?: BaseUpdate<any>;
  update?: BaseUpdate<any>;
}

export class BaseUpdate<T> {
  payload: {
    state: T;
  };
  callback?: UpdateCallBack;
  next?: BaseUpdate<T>;

  constructor(state: T, callback?: UpdateCallBack) {
    this.payload = { state };
    this.callback = callback;
  }
}

export class BaseUpdater {
  updateQueue: UpdateQueue;

  constructor() {
    this.updateQueue = new UpdateQueue();
  }

  enqueueUpdate<T>(state: T, callback?: UpdateCallBack): void {
    const comingUpdate = new BaseUpdate<T>(state, callback);
    let { pending, update } = this.updateQueue;
    if (!update) {
      update = comingUpdate;
      pending = comingUpdate;
      pending.next = update;
    } else {
      update.next = comingUpdate;
      comingUpdate.next = pending;
      pending = comingUpdate;
    }

    this.updateQueue.pending = pending;
    this.updateQueue.update = update;
  }
}
