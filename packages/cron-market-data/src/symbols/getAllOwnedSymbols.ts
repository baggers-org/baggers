import { BaggersMongoose, SymbolDocument } from '@baggers/mongoose';

export const getAllOwnedSymbols = async () => {
  const symbols: Array<SymbolDocument> = [];

  const cursor = await BaggersMongoose.models.Position?.aggregate([
    {
      $group: {
        _id: `$symbol`,
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
        symbol: `$symbol`,
      },
    },
  ]).exec();

  await cursor?.forEach((position: any) => symbols.push(position.symbol));

  return symbols;
};
