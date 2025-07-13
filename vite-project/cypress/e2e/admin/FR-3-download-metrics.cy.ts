// FR-3  Admin metric download
describe('FR-3 admin metrics download', { tags: ['FR-3'] }, () => {
  const downloads = Cypress.config('downloadsFolder');

  before(() => {
    cy.login('admin@titanic.com', 'changeme');              // seeded admin
  });

  it('returns a CSV file with today’s date', () => {
    cy.contains('Settings').click();
    cy.contains('Download metrics').click();

    const today = Cypress.moment().format('YYYY-MM-DD');    // moment is bundled
    const expectedName = `metrics-${today}.csv`;

    cy.readFile(`${downloads}/${expectedName}`, { timeout: 10_000 })
      .should('include', 'accuracy,precision,recall');      // sample headers
  });
});
