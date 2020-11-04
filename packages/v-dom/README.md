# v-dom

1. definition of v-dom

   - 使用 js 对象表示 dom 元素。

   ```html
   <div style="color: red">Hello World</div>
   <!-- h('div', { style: 'color: red' }, ['Hello World']) -->
   ```

2. v-dom 需要完成的工作

   - 生成`dom树`的 js 对象表达、
   - 对两个数进行 diff 操作，并生成 diff 树、
   - 将 diff 的结果 patch 到真实树上、

3. [Node](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 和 [Element](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 的区别

   ```
   Node是一个基类，DOM中的Element，Text，Comment都继承于它。简而言之，HTML中的任何元素都可以是一个Node。
   Element是拥有特殊类型的Node，比如有text nodes/ comment nodes/ document nodes等。
   Element是可以直接通过html标签声明的node，同时具有一些属性，比如id，class等。
   一共有12中类型的Node，Element是其中的一种。

   *deprecated  不推荐使用，但任然可用。

   Name	                         Value    status
   ELEMENT_NODE                  1
   ATTRIBUTE_NODE 	             2        deprecated
   TEXT_NODE	                 3
   CDATA_SECTION_NODE	         4
   ENTITY_REFERENCE_NODE 	     5        deprecated
   ENTITY_NODE 	                 6        deprecated
   PROCESSING_INSTRUCTION_NODE	 7
   COMMENT_NODE	                 8
   DOCUMENT_NODE	             9
   DOCUMENT_TYPE_NODE	        10
   DOCUMENT_FRAGMENT_NODE	    11
   NOTATION_NODE 	            12        deprecated
   ```
