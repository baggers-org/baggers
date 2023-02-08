import {
  TransactionSubtype,
  TransactionType,
} from '@baggers/graphql-types';
import { SelectOption } from '@baggers/ui-components';

const getOptionFromEnum = (
  subtype: TransactionSubtype
): SelectOption => {
  let category: TransactionType | null = null;
  switch (subtype) {
    case TransactionSubtype.Buy:
    case TransactionSubtype.BuyToCover:
    case TransactionSubtype.DividendReinvestment: {
      category = TransactionType.Buy;
      break;
    }

    case TransactionSubtype.Sell:
    case TransactionSubtype.SellShort:
    case TransactionSubtype.Exercise: {
      category = TransactionType.Sell;
      break;
    }

    default: {
      category = TransactionType.Buy;
    }
  }

  if (!category)
    throw Error('Could not find option for value ' + subtype);

  return {
    label: subtype,
    category: category,
    id: subtype,
  };
};
export function useTransactionTypes(): SelectOption[] {
  return Object.values([
    TransactionSubtype.Buy,
    TransactionSubtype.Sell,
  ]).map(getOptionFromEnum);
}
