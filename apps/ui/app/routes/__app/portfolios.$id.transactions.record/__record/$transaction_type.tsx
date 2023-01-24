import { TransactionType } from '@baggers/graphql-types';
import { useParams } from '@remix-run/react';
import { RecordBuySell } from '~/pages/portfolios/record-transaction/record-buy-sell';

export default function RecordTrade() {
  const { transaction_type } = useParams();

  switch (transaction_type as TransactionType) {
    case TransactionType.Buy.toLowerCase():
      return (
        <>
          <input
            type="hidden"
            name="type"
            value={TransactionType.Buy}
          />
          <RecordBuySell />
        </>
      );
    case TransactionType.Sell.toLowerCase():
      return (
        <>
          <input
            type="hidden"
            name="type"
            value={TransactionType.Sell}
          />
          <RecordBuySell />
        </>
      );
    default:
      throw Error('This transaction type is not supported');
  }
}
