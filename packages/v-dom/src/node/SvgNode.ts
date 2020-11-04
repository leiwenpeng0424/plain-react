// svg 比较特殊的地方是需要添加namespace，这里独立成一个class，用来处理svg node

export default class SvgNode {
  namespace: string = '';
  is = (type: string): boolean => type === 'svg';
}
