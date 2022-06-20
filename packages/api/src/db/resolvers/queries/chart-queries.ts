import { Arg, Query, registerEnumType, Resolver } from 'type-graphql';
import { ObjectId } from 'mongodb';
import { iexFetch } from '@/iex/iexFetch';
import { SymbolModel } from '@/db/entities';
import { NotFoundError } from '@/db/errors/NotFoundError';
import { ObjectIdScalar } from '@/db/object-id.scalar';
import { ChartPriceRangeOptions } from '@/db/inputs/chart-inputs';
import { Chart } from '@/db/classes/Chart';

export enum HistorialRange {
  max = 'max',
  Last5Years = '5y',
  Last2Years = '2y',
  LastYear = '1y',
  YearToDate = 'ytd',
  Last6Months = '6m',
  Last3Months = '3m',
  LastMonth = '1m',
  LastMonth30MinuteIntervals = '1mm',
  Last5Days = '5d',
  Last5Days10MinuteIntervals = '5dm',
  'date' = 'date',
  'dynamic' = 'dynamic',
}

registerEnumType(HistorialRange, { name: 'HistoricalRange' });

@Resolver()
export class ChartQueries {
  @Query(() => [Chart])
  async chartPriceRange(
    @Arg('symbolId', () => ObjectIdScalar) symbolId: ObjectId,
    @Arg('range', () => HistorialRange)
    range: HistorialRange,
    @Arg('options', () => ChartPriceRangeOptions, { nullable: true })
    options?: ChartPriceRangeOptions,
  ) {
    const symbol = await SymbolModel.findById(symbolId).orFail(
      () => new NotFoundError('Could not find a symbol with id ' + symbolId),
    );

    return iexFetch(`/stock/${symbol.symbol}/chart/${range}`, options);
  }
}
