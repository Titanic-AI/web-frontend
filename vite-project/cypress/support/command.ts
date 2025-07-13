// cypress/support/commands.ts
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.visit('/login');
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="password"]').type(password, { log: false });
    cy.get('[data-testid="submit"]').click();
    cy.contains('Dashboard').should('be.visible');
  });
});
