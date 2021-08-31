import { mongo, ObjectId } from "mongoose";
import batchFetchQuotes from "../http/batchFetchQuotes";
import { SymbolDocument } from "../mongoose/interfaces";
import { models } from "../mongoose/index";

/**
 * @param symbolIds Array of ids from symbol._id to fetch the quote data for
 */
const updateSymbolQuoteBatch = async (symbolIds: Array<ObjectId>) => {
  const symbolsCursor = await models.Symbol?.find()
    .where(`_id`)
    .in(symbolIds)
    .exec();

  const symbols: Array<SymbolDocument> = [];

  symbolsCursor?.forEach((symbol) => symbols.push(symbol as any));

  const quotes = await batchFetchQuotes(symbols.map((s) => s.symbol));

  const bulkUpdateExistingQuote = [];
  const bulkInsertNewQuote = [];
  const bulkLinkQuoteToSymbol = [];

  for (let i = 0; i < symbols.length; i++) {
    const symbol = symbols[i];
    const quoteData = quotes[symbol.symbol].quote;

    // Overwrite the symbol string that comes from iex with the symbol id
    // lol fck typescript here btw
    quoteData.symbol = symbol._id as any;

    // For every symbol - upsert a new quote and
    if (symbol.quote) {
      // Symbol already has previous quote data
      // overwrite it
      bulkUpdateExistingQuote.push({
        updateOne: {
          filter: {
            _id: symbol.quote,
          },
          update: {
            $set: quoteData,
          },
        },
      });
    } else {
      // First time doing quote data for this symbol
      bulkInsertNewQuote.push({
        insertOne: {
          document: {
            ...quoteData,
            symbol: symbol._id,
          },
        },
      });

      // Find the relevant symbol and add quote id to it
      bulkLinkQuoteToSymbol.push((insertedId: string) => ({
        updateOne: {
          filter: {
            _id: symbol._id,
          },
          update: {
            $set: {
              quote: new mongo.ObjectID(insertedId),
            },
          },
        },
      }));
    }
  }

  if (bulkInsertNewQuote.length > 0) {
    console.log(`Inserting `, bulkInsertNewQuote.length, ` new quotes`);
    const insertRes = await models.Quote?.bulkWrite(bulkInsertNewQuote);
    if (insertRes?.insertedIds) {
      console.log(`Successfully inserted ${insertRes.insertedCount} quotes`);
      console.log(
        `Linking `,
        bulkLinkQuoteToSymbol.length,
        ` new quotes to relevant symbol`
      );

      // Map through all the newly inserrted quotes, and link them up to the relevant symbols
      const ids = Object.values(insertRes.insertedIds);
      const operations = [];
      for (let i = 0; i < ids.length; i++) {
        operations.push(bulkLinkQuoteToSymbol[i](ids[i]));
      }

      const linkRes = await models.Symbol?.bulkWrite(operations);

      if (linkRes?.modifiedCount) {
        console.log(
          `Successfully linked ${linkRes.modifiedCount} quotes to their relevant symbol`
        );
      }
    }
  }
  if (bulkUpdateExistingQuote.length > 0) {
    console.log(
      `Updating `,
      bulkUpdateExistingQuote.length,
      ` existing quotes`
    );

    const updateRes = await models.Quote?.bulkWrite(bulkUpdateExistingQuote);
    if (updateRes?.modifiedCount) {
      console.log(
        `Successfully updated ${updateRes.modifiedCount} quotes with latest market data`
      );
    }
  }
};
export default updateSymbolQuoteBatch;
