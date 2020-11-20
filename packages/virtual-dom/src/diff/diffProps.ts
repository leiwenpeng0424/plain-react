// diff props

import {Updater, VNode} from '../../types';
import patchTypes from '../const/PatchTypes';

export default function diffProps(node: VNode, update: Updater): void {
  const {data} = node;
  const newData = update.node.data;

  if (!newData && !data) {
    return;
  } else {
    if (data && newData) {
      if (data.key === newData.key) {
        //  相同的key，那么就简单处理
        for (const dataKey in data) {
          if (Object.prototype.hasOwnProperty.call(data, dataKey)) {
            if (data[dataKey] !== newData[dataKey]) {
              update.effects.push({
                type: patchTypes.update_attrs,
                data: {}
              });
            }
          }
        }
      }
    }
  }

  return;
}
