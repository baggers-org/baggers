export const pluralOrNot = (word: string, arrayToCheck: any[]) => {
  if (arrayToCheck.length > 1) {
    return `${word}s`;
  }
  return word;
};
