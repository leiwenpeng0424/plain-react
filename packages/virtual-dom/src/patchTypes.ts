import { EffectTypes } from '../types';

const Types = {
  remove: 'REMOVE',
  add: 'ADD',
  replace: 'REPLACE', // 相当于一次remove和一次add
  reorder: 'REORDER', // 交换位置
  update: 'UPDATE' // 更新组件，更新部分状态，不需要重新创建
};

export default Types as Record<string, EffectTypes>;
