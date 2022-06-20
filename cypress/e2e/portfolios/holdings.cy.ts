describe('Portfolio holdings', () => {
  before(() => {
    cy.login(Cypress.env('Auth0Username'), Cypress.env('Auth0Password'));
  });
  it('user can add holdings to a portfolio directly', () => {
    cy.visit('/portfolios/created');
    cy.findByText('Create portfolio').click();
    cy.findByPlaceholderText('Enter portfolio title').type(
      "Warren's Secret Portfolio",
    );

    cy.findByRole('button', { name: 'confirm portfolio name' }).click();

    cy.findByText('Add holding').click();

    cy.findByText('I understand').click();

    cy.findByPlaceholderText('Search tickers').type('ONDS');

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
        `+$${expectedReturnUsd.toFixed(2)}`,
      );
      cy.findByLabelText('Return percent').should(
        'contain.text',
        `+${expectedReturnPercent.toFixed(2)}%`,
      );

      //Add the holding
      cy.findByText('Add holding').click();
      cy.wait('@addHolding');

      // Check the table row is correct
      cy.wait(1000);
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
        .find('[data-field="symbol.quote.latestPrice"]')
        .should('contain.text', `$${onds.quote.latestPrice}`);
      firstRow()
        .find('[data-field="profitLossPercent"]')
        .should('contain.text', `+${expectedReturnPercent.toFixed(2)}%`);
      firstRow()
        .find('[data-field="profitLossUsd"]')
        .should('contain.text', `+$${expectedReturnUsd.toFixed(2)}`);
    });
  });

  after(() => {
    cy.findByText('Settings').scrollIntoView().click({ force: true });
    cy.get('[data-cy="delete portfolio"]').click({ force: true });
    cy.findByText('Yes delete it').click();
  });
});
