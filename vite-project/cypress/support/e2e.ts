// cypress/support/e2e.ts
// Runs before every spec.  Extend Cypress commands & set global hooks here.

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Logs a user in via UI (preferred for full-stack tests).
       * Falls back to API if you ever add a dedicated auth endpoint.
       */
      login(email: string, password: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');                              // adjust route if needed
  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="password"]').type(password, { log: false });
  cy.get('[data-testid="submit"]').click();
  cy.contains('Dashboard').should('be.visible');
});
