import { BaggersMongoose, SymbolDocument } from '@baggers/mongoose';

export const getAllSymbols = async () => {
  const symbolsCursor = BaggersMongoose.models.Symbol?.find();

  const allSymbols: Array<SymbolDocument> = [];
  let symbol;

  // Add all the symbol strings to a big array
  (await symbolsCursor)?.forEach((s) => allSymbols.push(s as SymbolDocument));
  return allSymbols;
};
