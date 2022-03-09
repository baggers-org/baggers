export const valueOrError = <T, K extends keyof T>(
  obj: T,
  fieldName: K,
): NonNullable<T[K]> => {
  const value = obj[fieldName];
  if (!value) {
    throw Error(
      `Tried to calculate position metrics without a ${fieldName} value set. This should never happen. File an issue at https://github.com/dan-cooke/baggers/issues`,
    );
  }
  return value as NonNullable<T[K]>;
};
