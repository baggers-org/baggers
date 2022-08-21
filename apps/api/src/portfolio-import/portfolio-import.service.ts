import { Auth0AccessTokenPayload } from '~/auth';
import { PlaidAccount, PlaidItem, PlaidItemsService } from '~/plaid-items';
import {
  HoldingSource,
  PortfoliosService,
  Transaction,
  Holding,
  Portfolio,
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
      const plaidSecurity = securities.find(
        (s) => s.security_id === t.security_id
      );

      const importedSecurity =
        ImportedSecurity.fromPlaidSecurity(plaidSecurity);

      const security = securityMap.get(importedSecurity.security_id);

      const transaction: Transaction = {
        name: t.name,
        currency: t.iso_currency_code,
        date: new Date(t.date),
        price: t.price,
        amount: t.amount,
        type: t.type,
        subType: t.subtype,
        fees: t.fees,
        quantity: t.quantity,
        security: security?._id,
        plaidTransactionId: t.investment_transaction_id,
        plaidAccountId: t.account_id,
        securityType: security?.type || importedSecurity?.type,
        importedSecurity,
      };
      return transaction;
    });
  }

  importHoldings(
    response: InvestmentsHoldingsGetResponse,
    securityMap: SecurityMap
  ): Holding[] {
    const { holdings, securities } = response;

    return holdings.map((t) => {
      const plaidSecurity = securities.find(
        (s) => s.security_id === t.security_id
      );
      const importedSecurity =
        ImportedSecurity.fromPlaidSecurity(plaidSecurity);

      const security = securityMap.get(importedSecurity.security_id);

      const holding: Holding = {
        averagePrice: t.cost_basis / t.quantity,
        costBasis: t.cost_basis,
        quantity: t.quantity,
        plaidAccountId: t.account_id,
        institutionValue: t.institution_value,
        source: HoldingSource.broker,
        importedSecurity,
        currency: t.iso_currency_code,
        security: security?._id,
        securityType: security?.type || importedSecurity?.type,
        _id: new ObjectId(),
      };

      return holding;
    });
  }

  /**
   * This function will look at a plaid item and
   */
  async getPortfoliosFromItem(item: string | PlaidItem): Promise<Portfolio[]> {
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
      ...transactionsResponse.securities.map((s) =>
        ImportedSecurity.fromPlaidSecurity(s)
      ),
      ...holdingsResponse.securities.map((s) =>
        ImportedSecurity.fromPlaidSecurity(s)
      ),
    ];
    const securityMap =
      await this.securitiesService.importedToBaggersSecurities(
        importedSecurities
      );

    const { accounts } = holdingsResponse;

    const portfolios = accounts.map((account, index) => {
      // const cash = account.balances.available;
      const name =
        account.official_name || account.name || 'imported portfolio ' + index;

      const holdings: Holding[] = this.importHoldings(
        holdingsResponse,
        securityMap
      ).filter((h) => h.plaidAccountId === account.account_id);

      const portfolio: Portfolio = {
        _id: new ObjectId(),
        plaidItem: plaidItem._id,
        private: true,
        description:
          account.official_name ||
          'This portfolio has been imported from your broker',
        updatedAt: new Date(),
        createdAt: new Date(),
        owner: plaidItem.owner,
        plaidAccount: account as unknown as PlaidAccount,
        name: name,
        holdings,
        transactions: this.importTransactions(
          transactionsResponse,
          securityMap
        ).filter((t) => t.plaidAccountId === account.account_id),
      };

      return portfolio;
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
}
