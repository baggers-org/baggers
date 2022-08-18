import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Security } from 'plaid';
import { SecurityType } from '../enums/security-type.enum';

@ObjectType()
export class ImportedSecurity {
  [key: string]: object | any;
  /**
   * A unique, Plaid-specific identifier for the security, used to associate securities with holdings. Like all Plaid identifiers, the `security_id` is case sensitive.
   * @type {string}
   * @memberof Security
   */
  @Prop()
  security_id: string;
  /**
   * 12-character ISIN, a globally unique securities identifier.
   * @type {string}
   * @memberof Security
   */
  @Field({ nullable: true })
  @Prop()
  isin: string | null;
  /**
   * 9-character CUSIP, an identifier assigned to North American securities.
   * @type {string}
   * @memberof Security
   */
  @Field({ nullable: true })
  @Prop()
  cusip: string | null;
  /**
   * 7-character SEDOL, an identifier assigned to securities in the UK.
   * @type {string}
   * @memberof Security
   */
  @Field({ nullable: true })
  @Prop()
  sedol: string | null;
  /**
   * An identifier given to the security by the institution
   * @type {string}
   * @memberof Security
   */
  @Prop()
  @Field({ nullable: true })
  institution_security_id: string | null;
  /**
   * If `institution_security_id` is present, this field indicates the Plaid `institution_id` of the institution to whom the identifier belongs.
   * @type {string}
   * @memberof Security
   */
  @Prop()
  @Field({ nullable: true })
  institution_id: string | null;
  /**
   * In certain cases, Plaid will provide the ID of another security whose performance resembles this security, typically when the original security has low volume, or when a private security can be modeled with a publicly traded security.
   * @type {string}
   * @memberof Security
   */
  @Prop()
  @Field({ nullable: true })
  proxy_security_id: string | null;
  /**
   * A descriptive name for the security, suitable for display.
   * @type {string}
   * @memberof Security
   */
  @Prop()
  @Field({ nullable: true })
  name: string | null;
  /**
   * The security’s trading symbol for publicly traded securities, and otherwise a short identifier if available.
   * @type {string}
   * @memberof Security
   */
  @Prop()
  @Field({ nullable: true })
  ticker_symbol: string | null;
  /**
   * Indicates that a security is a highly liquid asset and can be treated like cash.
   * @type {boolean}
   * @memberof Security
   */
  @Prop()
  @Field({ nullable: true })
  is_cash_equivalent: boolean | null;
  /**
  is_cash_equivalent: boolean | null;
   * The security type of the holding. Valid security types are:  
    `cash`: Cash, currency, and money market funds  
    `cryptocurrency`: Digital or virtual currencies  
    `derivative`: Options, warrants, and other derivative instruments  
    `equity`: Domestic and foreign equities  
    `etf`: Multi-asset exchange-traded investment funds  
    `fixed income`: Bonds and certificates of deposit (CDs)  
    `loan`: Loans and loan receivables  
    `mutual fund`: Open- and closed-end vehicles pooling funds of multiple investors  
    `other`: Unknown or other investment types
   * @type {string}
   * @memberof Security
   */
  @Prop({ enum: SecurityType, type: String })
  @Field(() => SecurityType, { nullable: true })
  type: SecurityType | null;
  /**
   * Price of the security at the close of the previous trading session. Null for non-public securities.   If the security is a foreign currency this field will be updated daily and will be priced in USD.   If the security is a cryptocurrency, this field will be updated multiple times a day. As crypto prices can fluctuate quickly and data may become stale sooner than other asset classes, please refer to update_datetime with the time when the price was last updated.
   * @type {number}
   * @memberof Security
   */
  @Prop()
  @Field({ nullable: true })
  close_price: number | null;
  /**
   * Date for which `close_price` is accurate. Always `null` if `close_price` is `null`.
   * @type {string}
   * @memberof Security
   */
  @Prop()
  @Field({ nullable: true })
  close_price_as_of: string | null;
  /**
   * Date and time at which close_price is accurate, in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ). Always null if close_price is null.
   * @type {string}
   * @memberof Security
   */
  @Prop()
  @Field({ nullable: true })
  update_datetime?: string | null;
  /**
   * The ISO-4217 currency code of the price given. Always `null` if `unofficial_currency_code` is non-`null`.
   * @type {string}
   * @memberof Security
   */
  @Prop()
  @Field({ nullable: true })
  iso_currency_code: string | null;
  /**
   * The unofficial currency code associated with the security. Always `null` if `iso_currency_code` is non-`null`. Unofficial currency codes are used for currencies that do not have official ISO currency codes, such as cryptocurrencies and the currencies of certain countries.  See the [currency code schema](https://plaid.com/docs/api/accounts#currency-code-schema) for a full listing of supported `iso_currency_code`s.
   * @type {string}
   * @memberof Security
   */
  @Prop()
  @Field({ nullable: true })
  unofficial_currency_code: string | null;

  static fromPlaidSecurity(security: Security): ImportedSecurity {
    return {
      ...security,
      type: SecurityType[security.type.replace(' ', '_')],
    };
  }
}
