// FR-2  Dashboard prediction flow
describe('FR-2 survival prediction', { tags: ['FR-2'] }, () => {
  before(() => {
    // You could create a user via API to speed things up
    cy.login('demo@titanic.com', 'changeme');   // seeded credentials
  });

  it('shows a probability between 0 and 1 for valid input', () => {
    cy.contains('Predict').should('be.visible');

    // Fill the predictor form
    cy.get('[data-testid="passenger-name"]').type('Rose Dawson');
    cy.get('[data-testid="age"]').type('18');
    cy.get('[data-testid="class"]').select('1st');

    cy.get('[data-testid="predict-btn"]').click();

    // Assertion: value exists and is between 0 and 1
    cy.get('[data-testid="probability"]')
      .invoke('text')
      .then(parseFloat)
      .should('be.gte', 0)
      .and('be.lte', 1);
  });
});
