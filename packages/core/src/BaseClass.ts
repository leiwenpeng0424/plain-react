import { UpdateCallBack, BaseUpdater } from "@core/src/BaseUpdater";

export class BaseClass<S, P> {
  protected updater: BaseUpdater;
  protected state: S;
  protected props: P;

  constructor(state: S, props: P, updater: BaseUpdater) {
    if (!updater) {
      updater = new BaseUpdater();
    }
    this.state = state;
    this.props = props;
    this.updater = updater;
  }

  forceUpdate(state: S, callback: UpdateCallBack) {
    this.updater.enqueueUpdate<S>(state, callback);
  }

  setState(state: S, callback: UpdateCallBack) {
    this.updater.enqueueUpdate<S>(state, callback);
  }
}
