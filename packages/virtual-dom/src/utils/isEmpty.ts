export function isEmptyObject(obj: any): boolean {
  if (
    Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() === 'array'
  ) {
    return (obj as Array<any>).length === 0;
  }

  if (
    Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() === 'object'
  ) {
    return Object.keys(obj as Record<any, any>).length === 0;
  }

  return false;
}
