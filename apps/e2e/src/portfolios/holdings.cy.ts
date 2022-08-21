import { skipOn } from '@cypress/skip-test';

describe('Portfolio holdings', () => {
  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.visit('/portfolios/created');
  });

  it('user can add holdings to a portfolio directly', () => {
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

    // Check the return section is correct
    cy.fixture('ONDS').then((onds) => {
      const marketValue = onds.quote.latestPrice * 20;
      const costBasis = 6.5 * 20;
      const expectedReturnUsd = marketValue - costBasis;
      const expectedReturnPercent = (expectedReturnUsd / costBasis) * 100;

      cy.intercept('/portfolios/*/holdings/add/*').as('addHolding');

      cy.findByLabelText('Return USD').should(
        'contain.text',
        `+$${expectedReturnUsd.toFixed(2)}`
      );
      cy.findByLabelText('Return percent').should(
        'contain.text',
        `+${expectedReturnPercent.toFixed(2)}%`
      );

      //Add the holding
      cy.findByText('Add holding').click();
      cy.wait('@addHolding');

      // Check the table row is correct
      const firstRow = () => cy.findAllByRole('row').eq(1);

      firstRow()
        .find('[data-field="marketValue"]')
        .should('contain.text', `$${marketValue.toFixed(2)}`);
      firstRow()
        .find('[data-field="costBasis"]')
        .should('contain.text', `$${costBasis.toFixed(2)}`);
      firstRow()
        .find('[data-field="averagePrice"]')
        .should('contain.text', `$6.50`);
      firstRow()
        .find('[data-field="security.quote.latestPrice"]')
        .should('contain.text', `$${onds.quote.latestPrice}`);
      firstRow()
        .find('[data-field="profitLossPercent"]')
        .should('contain.text', `+${expectedReturnPercent.toFixed(2)}%`);
      firstRow()
        .find('[data-field="profitLossUsd"]')
        .should('contain.text', `+$${expectedReturnUsd.toFixed(2)}`);

      // Should have a direct holding source
      cy.findByLabelText('direct holding source');

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
    cy.findAllByText('isa').first().click();

    cy.findByText('Total Rows: 5');

    // All of these holdings should have a broker holding source
    cy.findAllByLabelText('broker holding source').should('have.length', 5);
  });
});
