describe('NotFound spec', () => {

  it('should display page not found', () => {

    cy.visit('/404');

    cy.get("[data-cy=not-found").should("contain", "Page not found !");

  })

});



