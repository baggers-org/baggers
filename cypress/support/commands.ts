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

  cy.request({
    method: 'POST',
    url: `https://baggers-staging.eu.auth0.com/oauth/token`,
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      grant_type: 'password',
      username: 'xX_wbuffet666@berkshire.com',
      password: 'xX_stockmaster_XX124%',
      audience: 'https://baggers-api-staging.fly.dev/graphql',
      scope: 'openid profile email offline_access',
      client_id: 'cG6pvSKaRakadaBHI5QLJCpRz9avBjEX',
      client_secret:
        'ej6ucYJ6rHgQ-rnGdtqZuwg_ZPNqCxXPI9YlsQO53xcKkopAoGj2cvVsCQ-G0Z1M',
    },
  }).then(({ body }) => {
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
