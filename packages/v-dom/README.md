# v-dom

1. definition of v-dom

使用 js 对象表示 dom 元素。

```html
<div style="color: red">Hello World</div>
<!-- h('div', { style: 'color: red' }, ['Hello World']) -->
```

2. v-dom 需要完成的工作

   - 生成`dom树`的 js 对象表达、
   - 对两个数进行 diff 操作，并生成 diff 树、
   - 将 diff 的结果 patch 到真实树上、
