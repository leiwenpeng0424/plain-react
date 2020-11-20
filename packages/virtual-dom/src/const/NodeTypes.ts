export default {
  element: Symbol('ELEMENT_NODE'), // 1
  attribute: Symbol('ATTRIBUTE_NODE'), // 2 属性值
  text: Symbol('TEXT_NODE'), // 3 节点内容
  cdata_section: Symbol('CDATA_SECTION_NODE'), // 4 节点内容
  entity_reference: Symbol('ENTITY_REFERENCE_NODE'), // 5
  entity: Symbol('ENTITY_NODE'), // 6
  processing_instruction: Symbol('PROCESSING_INSTRUCTION_NODE'), // 7 节点的内容
  comment: Symbol('COMMENT_NODE'), // 8 注释文本
  document: Symbol('DOCUMENT_NODE'), // 9
  document_type: Symbol('DOCUMENT_TYPE_NODE'), // 10
  document_fragment: Symbol('DOCUMENT_FRAGMENT_NODE'), // 11
  notation: Symbol('NOTATION_NODE'), // 12

  //  inner component types
  inner_component: Symbol('INNER_COMPONENT')
};
