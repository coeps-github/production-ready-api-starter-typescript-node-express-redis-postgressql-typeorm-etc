export function removePropertiesFromObject(properties: string[], obj: object): object {
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