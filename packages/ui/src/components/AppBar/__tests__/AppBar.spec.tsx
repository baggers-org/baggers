import { AppBar } from '..';

describe(`AppBar`, () => {
  // this is just a dummy test
  it(`should contain the relevant app sections`, () => {
    cy.mount(<AppBar />);
    cy.findByText(`Dashboard`);
    cy.findByText(`Portfolios`);
    cy.findByText(`Charts`);
    cy.findByText(`Search`);
  });
});
