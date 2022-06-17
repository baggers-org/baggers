describe('Portfolio holdings', () => {
  before(() => {
    cy.login(Cypress.env('Auth0Username'), Cypress.env('Auth0Password'));
  });
  it('user can add holdings to a portfolio directly', () => {
    cy.visit('/portfolios/created');
    cy.findByText('Create portfolio').click();
  });
});
