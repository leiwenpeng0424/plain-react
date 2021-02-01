export type ElementType = number | string | boolean;
export type ElementChild = BaseElement | Array<BaseElement>;

type PreservedKeys = "children" | "key";

export type ElementProps = Record<keyof PreservedKeys & any, unknown>;

export class BaseElement {
  type: ElementType;
  props: ElementProps;
  children: ElementChild;
  elem?: Node;

  constructor(type: ElementType, props: ElementProps, children: ElementChild) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}
