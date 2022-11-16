import { ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { PlaidAccountType } from '../enums';
import { PlaidAccountBalance } from './plaid-account-balance.entity';

@ObjectType()
export class PlaidAccount {
  /**
   * Plaid’s unique identifier for the account. This value will not change unless Plaid can\'t reconcile the account with the data returned by the financial institution. This may occur, for example, when the name of the account changes. If this happens a new `account_id` will be assigned to the account.  The `account_id` can also change if the `access_token` is deleted and the same credentials that were used to generate that `access_token` are used to generate a new `access_token` on a later date. In that case, the new `account_id` will be different from the old `account_id`.  If an account with a specific `account_id` disappears instead of changing, the account is likely closed. Closed accounts are not returned by the Plaid API.  Like all Plaid identifiers, the `account_id` is case sensitive.
   * @type {string}
   * @memberof AccountBase
   */
  @Prop()
  account_id: string;
  /**
   *
   * @type {AccountBalance}
   * @memberof AccountBase
   */
  @Prop(() => PlaidAccountBalance)
  balances: PlaidAccountBalance;
  /**
   * The name of the account, either assigned by the user or by the financial institution itself
   * @type {string}
   * @memberof AccountBase
   */
  @Prop()
  name?: string;
  /**
   * The official name of the account as given by the financial institution
   * @type {string}
   * @memberof AccountBase
   */
  @Prop({ type: String })
  official_name?: string | null;
  /**
   *
   * @type {PlaidAccountType}
   * @memberof AccountBase
   */
  @Prop({ enum: PlaidAccountType, type: String })
  type?: PlaidAccountType | null;
  /**
   *
   * @type {AccountSubtype}
   * @memberof AccountBase
   */
  @Prop({ type: String })
  subtype?: string | null;
}
