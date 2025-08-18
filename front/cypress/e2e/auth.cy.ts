describe("Auth spec", () => {
  it('should redirect to login page', () => {
    cy.visit('/sessions');
    cy.url().should('include', '/login');
  })
})
