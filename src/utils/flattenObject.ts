export const flattenObject = (
  obj: Record<string, unknown>,
  parentKey = '',
  result: Record<string, unknown> = {},
) => {
  Object.entries(obj).forEach(([key, value]) => {
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof value === 'object' && value !== null) {
      flattenObject(value as Record<string, unknown>, newKey, result);
    } else {
      result[newKey] = value;
    }
  });
  return result;
};
