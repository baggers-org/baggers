import { registerEnumType } from '@nestjs/graphql';

export enum HoldingSource {
  /** A direct holding is one that has been added directly to the portfolio
   * without any transaction data.
   * These holdings will not be included in analysis as they do not have any date/time
   * information associated with them
   * */
  direct = 'direct',
  /**
   * A transactions source means the holding has been generated from transaction data
   * stored on the portfolio.
   * These holdings will be included in analysis
   */
  transactions = 'transactions',

  /**
   * A broker source means this holding was generated from transaction data received
   * from the user's broker.
   * These holdings will be included in analysis
   */
  broker = 'broker',
}

registerEnumType(HoldingSource, {
  name: 'HoldingSource',
});
