describe('counter', () => {
  it('renders count 1 by default', () => {
    cy.visit('/');
    cy.get('h1').contains('Count 0');
  });

  it('increments the count when increment is clicked', () => {
    cy.visit('/');
    cy.get('.increment').click();
    cy.get('h1').contains('Count 1');
  });

  it('decrements the count when decrement is clicked', () => {
    cy.visit('/');
    cy.get('.decrement').click();
    cy.get('h1').contains('Count -1');
  });

  it('delays the increment when delayed increment is clicked', () => {
    cy.visit('/');
    cy.get('.delayed-increment').click();

    cy.get('.delayed-increment').should('be.disabled');
    cy.get('h1').contains('Count 0');

    cy.get('.delayed-increment').should('not.be.disabled');
    cy.get('h1').contains('Count 1');
  });
});
