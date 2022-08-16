import { Auth0AccessTokenPayload } from '~/auth';
import { PlaidItem, PlaidItemsService } from '~/plaid-items';
import { PortfolioFromDb, TransactionsUtilService } from '~/portfolios';
import { ObjectId } from '~/shared';
import { PlaidClientService } from '~/plaid-client';
import { Injectable } from '@nestjs/common';
import { AccountType } from 'plaid';

@Injectable()
export class PortfolioImportService {
  constructor(
    private plaid: PlaidClientService,
    private plaidItemsService: PlaidItemsService,
    private transactionsService: TransactionsUtilService
  ) {}

  /**
   * This function will look at a plaid item and
   */
  async getPortfoliosFromItem(
    item: string | PlaidItem
  ): Promise<PortfolioFromDb[]> {
    let plaidItem: PlaidItem;

    if (typeof item === 'string') {
      plaidItem = await this.plaidItemsService.findById(item);
    }

    const { accessToken, lastWebhookTime } = plaidItem;

    const response = await this.plaid.getTransactions(
      lastWebhookTime,
      accessToken
    );

    const { accounts } = response;
    const investmentAccounts = accounts.filter(
      (a) => a.type === AccountType.Investment
    );

    const accountTransactions =
      await this.transactionsService.fromPlaidResponse(response);

    return investmentAccounts.map((account, index) => {
      // const cash = account.balances.available;
      const name =
        account.name || account.official_name || 'imported portfolio ' + index;

      return this.transactionsService.applyTransactions({
        _id: new ObjectId(),
        // TODO: can we rely on transactions alone? - cash is 0 for now, and we will increment it in applyTransactions
        cash: 0,
        plaidItem: plaidItem._id,
        private: true,
        description: `This portfolio has been imported from your broker`,
        holdings: [],
        updatedAt: new Date(),
        createdAt: new Date(),
        owner: plaidItem.owner,
        plaidAccountId: account.account_id,
        name: name,
        transactions: accountTransactions.get(account),
      });
    });
  }

  /**
   * Begins importing a portfolio by creating a `PortfolioImport` document
   * and returning it to the client.
   * This is to be used by the web application
   */
  async beginImport(publicToken: string, currentUser: Auth0AccessTokenPayload) {
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

    const portfolios = this.getPortfoliosFromItem(item);
  }

  importPortfolios(plaidItemId: string, currentUser: Auth0AccessTokenPayload) {}
}
