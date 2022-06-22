import * as jwt from 'jsonwebtoken';
import '@testing-library/cypress/add-commands';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      login(username: string, password: string): Chainable<Element>;
    }
  }
}
// cypress/support/commands.js
Cypress.Commands.add('login', (username: string, password: string) => {
  cy.log(`Logging in as ${username}`);
  const client_id = Cypress.env('Auth0ClientId');
  const client_secret = Cypress.env('Auth0ClientSecret');
  const audience = Cypress.env('Auth0Audience');
  const scope = Cypress.env('Auth0Scope');

  console.log('Making request ');

  cy.request({
    method: 'POST',
    url: `https://${Cypress.env('Auth0Domain')}/oauth/token`,
    body: {
      grant_type: 'password',
      username,
      password,
      audience: 'https://baggers-api-staging.fly.dev/graphql',
      scope: 'openid profile email offline_access',
      client_id: '5KA0uKNvy4j51P09Qs5HcTXFjRbUOYES',
      client_secret:
        'l8ckq2CD8nYUIMOsp2WDmFKiAuHGb2v-cAIPAjxAOUiJNQWr0NoHn0ZcraKsCf1U',
    },
  }).then(({ body }) => {
    console.log('In here the body is ', body);
    cy.log('body', body);

    const claims = jwt.decode(body.id_token);
    const { name, picture, email, sub, exp } = claims as any;

    const user = {
      _id: sub,
      displayName: name,
      emails: [email],
      photos: [picture],
      accessToken: body.access_token,
      refreshToken: body.refresh_token,
      expires: Date.now() + exp * 1000,
    };

    cy.intercept(`${Cypress.config('baseUrl')}**`, (req) => {
      req.headers['X-Cypress'] = JSON.stringify(user);
    });
  });
});
