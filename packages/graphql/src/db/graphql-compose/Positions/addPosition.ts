import { BaggersMongoose, PositionDocument } from "@baggers/mongoose";
import { AuthenticationError } from "apollo-server-errors";
import { getTypeComposer, recordRequestOwner } from "../util";

const addPosition = () => ({
  addPosition: getTypeComposer(`Position`)
    .mongooseResolvers.createOne({
      record: {
        requiredFields: [
          `portfolio`,
          `symbol`,
          `averagePrice`,
          `numberOfShares`,
        ],
      },
    })
    .wrapResolve(recordRequestOwner)
    .wrapResolve((next: any) => async (rp: any) => {
      // Check if the portfolio exists, and this person is the owner, otherwise throw an error
      const portfolio = await BaggersMongoose.models.Portfolio?.findById(
        rp.args.record.portfolio
      );

      if (!portfolio) {
        throw new Error(`Portfolio does not exist`);
      }

      if (portfolio.owner !== rp.context.identity.sub) {
        throw new AuthenticationError(
          `You do not own this portfolio, you cannot add a position to it`
        );
      }

      rp.beforeRecordMutate = async (doc: PositionDocument, rp: any) => {
        if (doc.owner !== rp.context.identity.sub) {
          throw new Error(
            `You do not own this resource, you are unable to modify it`
          );
        }
        // Calculate cost basis here
        doc.costBasis = doc.numberOfShares * doc.averagePrice + doc.brokerFees;
        return doc;
      };

      // After document saved
      const payload = await next(rp);
      const position: PositionDocument = payload?.record;

      if (position && position._id) {
        // Add the position to the portfolio
        await BaggersMongoose.models.Portfolio?.findByIdAndUpdate(
          portfolio._id,
          {
            $push: { positions: position._id },
          }
        );

        // Get the symbol and check if it has quote data
        const positionSymbol = await BaggersMongoose.models.Symbol?.findById(
          position.symbol
        );

        if (positionSymbol && !positionSymbol?.quote) {
          console.log(`No quote exists for `, positionSymbol.symbol);

          // Fetch market data for this symbol
          await BaggersMongoose.marketDataFunctions.updateSymbolQuote(
            positionSymbol?._id
          );
          console.log(`Added quot for `, positionSymbol.symbol);
        }
        // Update the position's metrics
        const populatedPos = await BaggersMongoose.marketDataFunctions.updatePositionMetrics(
          position._id as any
        );

        if (populatedPos) {
          const returnVal = {
            ...payload,
            record: {
              ...payload.record,
              ...populatedPos,
            },
          };

          return returnVal;
        }
      }

      return payload;
    }),
});

export default addPosition;
