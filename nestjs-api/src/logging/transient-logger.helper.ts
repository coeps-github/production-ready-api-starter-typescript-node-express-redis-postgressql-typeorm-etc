export function removePropertiesFromObject(properties: string[], obj: { [key: string]: any }): { [key: string]: any } {
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