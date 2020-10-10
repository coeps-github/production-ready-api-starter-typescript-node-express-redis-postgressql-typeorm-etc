export function removePropertiesFromObject(properties: string[], obj: Record<string, unknown>): Record<string, unknown> {
  return Object.keys(obj).reduce((result, key) => {
    if (properties.includes(key)) {
      return result;
    } else {
      return {
        ...result,
        [key]: obj[key]
      };
    }
  }, {});
}