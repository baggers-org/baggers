import { BaggersMongoose, mongo } from "@baggers/mongoose";
import { getTypeComposer } from "../util";
import getPositionsSort from "./getPositionsSort";

export const PossibleSortOptions = [
  `COST_BASIS_ASC`,
  `COST_BASIS_DESC`,
  `MARKET_VALUE_ASC`,
  `MARKET_VALUE_DESC`,
  `PROFIT_LOSS_USD_ASC`,
  `PROFIT_LOSS_USD_DESC`,
  `SYMBOL_SYMBOL_ASC`,
  `SYMBOL_SYMBOL_DESC`,
  `SYMBOL_SECURITY_NAME_ASC`,
  `SYMBOL_SECURITY_NAME_DESC`,
  `SYMBOL_QUOTE_CHANGE_ASC`,
  `SYMBOL_QUOTE_CHANGE_DESC`,
  `SYMBOL_QUOTE_CHANGE_PERCENT_ASC`,
  `SYMBOL_QUOTE_CHANGE_PERCENT_DESC`,
  `SYMBOL_QUOTE_LATEST_PRICE_ASC`,
  `SYMBOL_QUOTE_LATEST_PRICE_DESC`,
  `SYMBOL_QUOTE_VOLUME_ASC`,
  `SYMBOL_QUOTE_VOLUME_DESC`,
] as const;

type PositionsSortTuple = typeof PossibleSortOptions;
export type PositionsSort = PositionsSortTuple[number];

export const addGetPositionsResolver = () => {
  getTypeComposer(`Position`).addResolver({
    name: `getPositions`,
    type: getTypeComposer(`Position`).mongooseResolvers.pagination().getType(),
    args: {
      filter: `
        input PositionsFilter {
            portfolio: MongoID
            isEtf: Boolean
            exchange: String
            country: String
        }
      `,
      sort: `
        enum PositionsSort {
          ${PossibleSortOptions.join(`\n`)}
        }
      `,
      perPage: `Int`,
      page: `Int`,
    },
    resolve: async ({
      args: { filter, sort, perPage, page },
      context,
    }: any) => {
      const limit = perPage || 25;

      const requestOwner = context.identity ? context.identity.sub : null;
      const offset = (page ?? 0) * limit;
      const pipeline = [];

      if (filter) {
        let filterWithMongoIds = filter;
        if (filter?.portfolio) {
          filterWithMongoIds = {
            ...filter,
            portfolio: new mongo.ObjectID(filter.portfolio),
          };
        }
        pipeline.push({
          $match: {
            ...filterWithMongoIds,
          },
        });
      }

      // IF we are fetching a specific users positions, only show public positions, unless we are
      // that owner
      // Only show public
      // TODO: re-examine this 
      // pipeline.push({
      //   $match: {
      //     $or: [{ private: true, owner: requestOwner }, { private: false }],
      //   },
      // });

      // Lookup symbol
      pipeline.push({
        $lookup: {
          from: `symbols`,
          localField: `symbol`,
          foreignField: `_id`,
          as: `symbol`,
        },
      });

      // Unwind lookup result to a single symbol object
      pipeline.push({
        $unwind: {
          path: `$symbol`,
        },
      });

      // Lookup quote
      pipeline.push({
        $lookup: {
          from: `quotes`,
          localField: `symbol.quote`,
          foreignField: `_id`,
          as: `symbol.quote`,
        },
      });

      if (sort) {
        pipeline.push(getPositionsSort(sort));
      }

      pipeline.push({
        $facet: {
          items: [{ $limit: limit }, { $skip: offset }],
          count: [{ $count: `count` }],
        },
      });

      pipeline.push({
        $unwind: `$count`,
      });

      pipeline.push({
        $project: {
          items: 1,
          count: `$count.count`,
        },
      });

      const result = await BaggersMongoose.models.Position?.aggregate(
        pipeline
      ).exec();

      return result[0];
    },
  });
};
