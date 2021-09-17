import { camelCase } from 'lodash';
import { PositionsSort } from './getPositions';

const getPositionsSort = (sortString: PositionsSort) => {
  const isAscending = sortString.substr(sortString.indexOf(`_ASC`)) === `_ASC`;
  const isQuoteSort = sortString.indexOf(`SYMBOL_QUOTE_`) === 0;
  const isSymbolSort = !isQuoteSort && sortString.indexOf(`SYMBOL_`) === 0;
  let fieldIndex = 0;
  if (isQuoteSort) {
    fieldIndex = sortString.indexOf(`_`, `SYMBOL_QUOTE`.length) + 1;
  }
  if (isSymbolSort) {
    fieldIndex = sortString.indexOf(`_`, `SYMBOL`.length) + 1;
  }

  const lastUnderscoreIndex = sortString.lastIndexOf(`_`);
  let sortKey = ``;
  if (isQuoteSort) {
    sortKey = `symbol.quote.`;
  }
  if (isSymbolSort) {
    sortKey = `symbol.`;
  }

  sortKey += camelCase(sortString.substring(fieldIndex, lastUnderscoreIndex));

  const sortValue = isAscending ? 1 : -1;

  return {
    $sort: {
      [sortKey]: sortValue,
    },
  };
};

export default getPositionsSort;
