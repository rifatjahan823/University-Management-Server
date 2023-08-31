const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Partial<T> => {
  const finalObj: Partial<T> = {};

  for (const Key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, Key)) {
      finalObj[Key] = obj[Key];
    }
  }
  return finalObj;
};

export default pick;
