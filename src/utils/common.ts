type AnyObject = Record<string, any>;

/**
 * Remove duplicates from an array of objects based on specified keys.
 * @param array The array of objects to process.
 * @param keys The keys to use for determining uniqueness.
 * @returns A new array with duplicates removed.
 */
export function removeDuplicates<T extends AnyObject>(array: T[], keys: (keyof T)[]): T[] {
  const seen = new Map<string, T>()

  array.forEach((item) => {
    const identifier = keys.map((key) => item[key])
      .join('|')

    if (!seen.has(identifier)) {
      seen.set(identifier, item)
    }
  })

  return Array.from(seen.values())
}

/**
 * Removes specified keys from an object.
 * @param obj - The object to process.
 * @param keysToRemove - The keys to remove from object.
 * @returns A new object with specified keys removed.
 */
export function removeKeys<T extends AnyObject, R = any>(obj: T, keysToRemove: (keyof T)[]): R {
  const newItem = {...obj}
  keysToRemove.forEach((key) => {
    delete newItem[key]
  })
  return newItem as unknown as R
}

export function removeDuplicatesValueArray<T extends string | number>(array: T[]): T[] {
  return Array.from(new Set(array));
}

export function normalizeQueryParams(params?: Record<string, any>): string {
  const entries = Object.entries(params || {});

  const sortedParams = entries
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => {
      const encodedValue = Array.isArray(value)
        ? value.map(v => encodeURIComponent(String(v)))
          .join(',')
        : encodeURIComponent(String(value));

      return `${encodeURIComponent(key)}=${encodedValue}`;
    })
    .join('&');

  return sortedParams;
}