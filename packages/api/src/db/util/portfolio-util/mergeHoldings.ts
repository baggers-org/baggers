import { Holding } from '@/db/entities';

const isDuplicateHolding = (holding1: Holding, holding2: Holding) =>
  holding1._id.toString() !== holding2._id.toString() &&
  holding1.symbol.toString() === holding2.symbol.toString() &&
  holding1.direction === holding2.direction &&
  holding1.type === holding2.type &&
  holding1.source === holding2.source;
/**
 * Combines duplicate holdings together into one position
 * Matches on symbol / direction
 */
export const mergeHoldings = (holdings: Holding[]) => {
  const newHoldings: Holding[] = [];

  for (const holding of holdings) {
    if (
      newHoldings.find((h) => h.symbol.toString() === holding.symbol.toString())
    )
      continue;

    const match = holdings.find((h) => isDuplicateHolding(h, holding));

    if (match) {
      // Merge together
      newHoldings.push({
        ...holding,
        costBasis: holding.costBasis + match.costBasis,
        averagePrice: (holding.averagePrice + match.averagePrice) / 2,
        quantity: holding.quantity + match.quantity,
      });

      continue;
    }

    newHoldings.push(holding);
  }

  return newHoldings;
};
