import { ObjectId } from "mongoose";
import fetchQuote from "../http/fetchQuote";
import { models } from "../mongoose";

/**
 * Update a single symbol's quote, uses a more efficeint endpoint than the batch version
 * @param symbolId Single _id field of symbol to update
 */
const updateSymbolQuote = async (symbolId: ObjectId) => {
  const symbol = await models.Symbol?.findById(symbolId).exec();

  if (!symbol?.symbol) return;

  const quote = await fetchQuote(symbol?.symbol);
  if (quote) {
    quote.symbol = symbolId;
    const quoteCreationRes = await models.Quote?.create(quote);
    const quoteId = quoteCreationRes?._id;

    if (quoteId) {
      const symbolUpdateRes = await models.Symbol?.findByIdAndUpdate(symbolId, {
        quote: quoteId,
      });

      if (symbolUpdateRes) {
        console.log(`Succesfully updated quote data for `, symbol?.symbol);
      }
    } else {
      throw new Error(
        `There was an error adding quote data for ${symbol?.symbol}`
      );
    }
  }

  return;
};

export default updateSymbolQuote;
