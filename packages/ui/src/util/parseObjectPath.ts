/**
 * Object paths will be used throughout to represent deeply nested data
 * as mongodb requires these paths to perform operations
 * For example:
 * On a position:
 * symbol.quote.latestPrice
 *
 * On a symbol
 * quote.latestPrice
 */
const parseObjectPath = (objPath: string) => {
  return objPath.split(`.`);
};

export default parseObjectPath;
