export function isValidElementKey(key: any): boolean {
  return typeof key === 'string' || typeof key === 'number';
}
