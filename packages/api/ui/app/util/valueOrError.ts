export const valueOrError = <T, K extends keyof T>(
  obj: T,
  fieldName: K,
): NonNullable<T[K]> => {
  const value = obj[fieldName];
  if (!value) {
    throw Error(
      `Expected to find property ${fieldName} on object ${JSON.stringify(
        obj,
      )}. But did not.`,
    );
  }
  return value as NonNullable<T[K]>;
};
