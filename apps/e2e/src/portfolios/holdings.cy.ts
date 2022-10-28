import { skipOn } from '@cypress/skip-test';
import { format } from 'date-fns';
import { formatCurrency } from '@baggers/util';

describe('Portfolio holdings', () => {
  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.visit('/portfolios/created');
  });

  it.only('user can add holdings to a portfolio directly', () => {
    cy.findByText('Create portfolio').click();
    cy.findByPlaceholderText('Enter portfolio title').type(
      "Warren's Secret Portfolio"
    );

    cy.findByRole('button', { name: 'confirm portfolio name' }).click();

    cy.findByText('Add holding').click();

    cy.findByPlaceholderText('Search securities').type('ONDS');

    cy.findByText('ONDS').click();

    cy.findByLabelText('Number of shares').type('20');
    cy.findByLabelText('Average price').type('6.50');

    // Transaction help message
    cy.findByText(
      'We will assume the transaction date is right now, unless you tell us otherwise.'
    );

    cy.findByText('Show advanced').click();

    const brokerFees = 2;
    cy.findByLabelText('Broker fees').type('2');

    // Check the return section is correct
    cy.fixture('ONDS').then((onds) => {
      const marketValue = onds.tickerSnapshot.min.c * 20;
      const costBasis = 6.5 * 20 + brokerFees;
      const expectedReturnUsd = marketValue - costBasis;
      const expectedReturnPercent = (expectedReturnUsd / costBasis) * 100;

      cy.intercept('/portfolios/*/holdings/add/*').as('addHolding');

      cy.findByLabelText('Return USD').should(
        'contain.text',
        `${formatCurrency(expectedReturnUsd)}`
      );
      cy.findByLabelText('Return percent').should(
        'contain.text',
        `${expectedReturnPercent.toFixed(2)}%`
      );

      //Add the holding
      cy.findByText('Add holding').click();
      cy.wait('@addHolding');

      // eslint-disable-next-line
      cy.wait(1000);
      // Check the table row is correct
      const firstRow = () => cy.findAllByRole('row').eq(1);

      firstRow()
        .find('[data-field="marketValue"]')
        .should('contain.text', `${formatCurrency(marketValue)}`);
      firstRow()
        .find('[data-field="costBasis"]')
        .should('contain.text', `${formatCurrency(costBasis)}`);
      firstRow()
        .find('[data-field="averagePrice"]')
        .should('contain.text', `$6.50`);
      firstRow()
        .find('[data-field="latestPrice"]')
        .should('contain.text', `${formatCurrency(onds.tickerSnapshot.min.c)}`);
      firstRow()
        .find('[data-field="profitLossPercent"]')
        .should('contain.text', `${expectedReturnPercent.toFixed(2)}%`);
      firstRow()
        .find('[data-field="profitLossUsd"]')
        .should('contain.text', `${formatCurrency(expectedReturnUsd)}`);

      cy.findByText('Transactions').click();

      //eslint-disable-next-line
      cy.wait(2000);

      firstRow()
        .find('[data-field="date"]')
        .should('contain.text', format(new Date(), 'do LLL yy'));
      firstRow().find('[data-field="amount"]').should('contain.text', '130');

      cy.findByText('BUY Ondas Holdings Inc. Common Stock');

      cy.findByText('Settings').click();

      cy.findByText('Delete portfolio').click();
      cy.findByText('Yes delete it').click();
    });
  });

  it('users should be able to import holdings from their broker', () => {
    // TODO: unskip if FF ever support disabling security for cross origin iframes
    skipOn('firefox');
    cy.findByText('Import from broker').click();

    cy.frameLoaded();

    cy.iframe().findByText('Continue').click();
    cy.iframe().findByText('Allow').click();

    cy.iframe().findByText('Vanguard').click();

    cy.fixture('Plaid1').then(({ username, password }) => {
      cy.iframe().findByLabelText('User Name').type(username);
      cy.iframe().findByLabelText('Password').type(password);
    });

    cy.iframe().findByText('Submit').click();
    cy.iframe().findByText('Continue').click();
    cy.iframe().findByText('View', { timeout: 20000 }).click();

    cy.url({ timeout: 15000 }).should(
      'eq',
      `${Cypress.config('baseUrl')}/portfolios/created`
    );

    // Most recent one will be the default sort
    cy.findAllByText('Isa').first().click();

    cy.findByText('Total Rows: 5');
  });
});
