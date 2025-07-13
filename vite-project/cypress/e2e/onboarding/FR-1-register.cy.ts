// FR-1  User registration (happy path)
describe('FR-1 user registration', { tags: ['FR-1'] }, () => {
  const password = 'P@ssw0rd!';

  it('allows a visitor to create an account and log in', () => {
    const email = `e2e+${Date.now()}@example.com`;

    cy.visit('/');
    cy.contains('Sign up').click();

    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="password"]').type(password, { log: false });
    cy.get('[data-testid="confirmPassword"]').type(password, { log: false });

    cy.get('[data-testid="submit"]').click();

    // UI feedback
    cy.contains(/welcome/i).should('be.visible');

    // Backend session proof (optional but robust)
    cy.request(`${Cypress.env('API_URL')}/auth/me`)
      .its('status')
      .should('eq', 200);
  });
});
