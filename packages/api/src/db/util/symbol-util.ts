import { PortfolioModel } from '../entities';
import { Symbol } from '../entities/symbol';

export const getAllOwnedSymbols = async () => {
  const symbols: Symbol[] = [];
  const cursor = await PortfolioModel?.aggregate([
    {
      $unwind: `$positions`,
    },
    {
      $group: {
        _id: `$positions.symbol`,
      },
    },
    {
      $lookup: {
        from: `symbols`,
        localField: `_id`,
        foreignField: `_id`,
        as: `symbol`,
      },
    },
    {
      $unwind: {
        path: `$symbol`,
      },
    },
    {
      $project: {
        _id: `$symbol._id`,
        symbol: `$symbol.symbol`,
      },
    },
  ]).exec();

  await cursor?.forEach((position: any) => symbols.push(position));

  return symbols;
};
