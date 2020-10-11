export function parseBoolean(str: string, fallback: boolean): boolean {
  if (str) {
    return str === 'true';
  }
  return fallback;
}
