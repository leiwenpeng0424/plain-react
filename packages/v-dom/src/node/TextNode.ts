// 纯文本节点

export default class TextNode {
  text: string;
  constructor(text: string) {
    this.text = text;
  }
  is = (type: string): boolean => type === 'text';
}
