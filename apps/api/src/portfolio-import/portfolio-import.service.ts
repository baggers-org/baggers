import { Auth0AccessTokenPayload } from '~/auth';
import { PlaidItem, PlaidItemsService } from '~/plaid-items';
import {
  HoldingFromDb,
  HoldingSource,
  PortfolioFromDb,
  PortfoliosService,
  Transaction,
} from '~/portfolios';
import { ObjectId } from '~/shared';
import { PlaidClientService } from '~/plaid-client';
import { Injectable } from '@nestjs/common';
import {
  InvestmentsHoldingsGetResponse,
  InvestmentsTransactionsGetResponse,
} from 'plaid';
import { ImportResponse } from './dto';
import { ImportedSecurity } from '~/securities';
import { SecuritiesUtilService } from '~/securities/securities-util.service';
import { SecurityMap } from '~/securities/types';

@Injectable()
export class PortfolioImportService {
  constructor(
    private plaid: PlaidClientService,
    private plaidItemsService: PlaidItemsService,
    private securitiesService: SecuritiesUtilService,
    private portfoliosService: PortfoliosService
  ) {}

  importTransactions(
    response: InvestmentsTransactionsGetResponse,
    securityMap: SecurityMap
  ): Transaction[] {
    const { investment_transactions, securities } = response;

    return investment_transactions.map((t) => {
      const importedSecurity = securities.find(
        (s) => s.security_id === t.security_id
      );
      return {
        name: t.name,
        currency: t.iso_currency_code,
        date: new Date(t.date),
        price: t.price,
        amount: t.amount,
        type: t.type,
        subType: t.subtype,
        fees: t.fees,
        quantity: t.quantity,
        plaidTransactionId: t.investment_transaction_id,
        plaidAccountId: t.account_id,
        importedSecurity,
        security: securityMap.get(importedSecurity),
      } as Transaction;
    });
  }

  importHoldings(
    response: InvestmentsHoldingsGetResponse,
    securityMap: SecurityMap
  ): HoldingFromDb[] {
    const { holdings, securities } = response;

    return holdings.map((t) => {
      const importedSecurity = securities.find(
        (s) => s.security_id === t.security_id
      );
      return {
        averagePrice: t.cost_basis / t.quantity,
        costBasis: t.cost_basis,
        quantity: t.quantity,
        plaidAccountId: t.account_id,
        institutionValue: t.institution_value,
        source: HoldingSource.broker,
        importedSecurity,
        security: securityMap.get(importedSecurity),
      } as HoldingFromDb;
    });
  }

  /**
   * This function will look at a plaid item and
   */
  async getPortfoliosFromItem(
    item: string | PlaidItem
  ): Promise<PortfolioFromDb[]> {
    let plaidItem: PlaidItem;

    if (typeof item === 'string') {
      plaidItem = await this.plaidItemsService.findById(item);
    } else {
      plaidItem = item;
    }
    const { lastWebhookTime, accessToken } = plaidItem;

    const transactionsResponse = await this.plaid.getTransactions(
      lastWebhookTime,
      accessToken
    );

    const holdingsResponse = await this.plaid.getHoldings(accessToken);

    const importedSecurities: ImportedSecurity[] = [
      ...transactionsResponse.securities,
      ...holdingsResponse.securities,
    ];
    const securityMap =
      await this.securitiesService.importedToBaggersSecurities(
        importedSecurities
      );

    const { accounts } = holdingsResponse;

    const portfolios = accounts.map((account, index) => {
      // const cash = account.balances.available;
      const name =
        account.name || account.official_name || 'imported portfolio ' + index;

      return {
        _id: new ObjectId(),
        cash: account.balances.available || 0,
        plaidItem: plaidItem._id,
        private: true,
        description:
          account.official_name ||
          'This portfolio has been imported from your broker',
        holdings: this.importHoldings(holdingsResponse, securityMap).filter(
          (h) => h.plaidAccountId === account.account_id
        ),
        updatedAt: new Date(),
        createdAt: new Date(),
        owner: plaidItem.owner,
        plaidAccountId: account.account_id,
        plaidAccountType: account.type,
        name: name,
        transactions: this.importTransactions(
          transactionsResponse,
          securityMap
        ).filter((t) => t.plaidAccountId === account.account_id),
      } as PortfolioFromDb;
    });

    return portfolios;
  }

  /**
   * Begins importing a portfolio by creating a `PortfolioImport` document
   * and returning it to the client.
   * This is to be used by the web application
   */
  async beginImport(
    publicToken: string,
    currentUser: Auth0AccessTokenPayload
  ): Promise<ImportResponse> {
    const { access_token } = await this.plaid.publicTokenExchange(publicToken);

    const plaidItem = await this.plaid.getItem(access_token);

    // Add it to our database
    const item = await this.plaidItemsService.create(
      {
        _id: plaidItem.item_id,
        accessToken: access_token,
        institution: plaidItem.institution_id,
      },
      currentUser
    );

    const portfolios = await this.getPortfoliosFromItem(item);
    await this.portfoliosService.insertMany(portfolios);

    return {
      importedIds: portfolios.map((p) => p._id),
    };
  }

  importPortfolios(plaidItemId: string, currentUser: Auth0AccessTokenPayload) {}
}
