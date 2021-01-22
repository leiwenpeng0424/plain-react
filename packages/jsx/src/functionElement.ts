import { BaseElement } from "@jsx/src/element";

export interface FunctionElement<P extends Record<string, unknown>>
  extends BaseElement {
  readonly type: "functionElement"
}

export type FC<P extends Record<string, unknown>> = (
  props: P
) => FunctionElement<P>;
