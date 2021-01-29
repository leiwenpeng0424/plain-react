export interface BaseElement {
  $$typeof: symbol | string;
  type: string;
}

export interface JsxProps {
  children?: any
}

export interface JsxPropsWithKey extends JsxProps {
  key: string | number
}

export function jsx(name: string, props: JsxProps) {}
