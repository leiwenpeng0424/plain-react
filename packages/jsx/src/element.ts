export interface BaseElement {
  $$typeof: symbol | string;
  type: string;
}

export interface JsxProps {
  hildren?: any
}

export interface JsxPropsWithKey extends JsxProps {
  key: string | number
}

export default function jsx(name: string, props: JsxProps) {}
