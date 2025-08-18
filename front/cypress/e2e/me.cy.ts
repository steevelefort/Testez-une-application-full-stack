describe('Me spec', () => {

  const getUserMock = (isAdmin) => (
    {
      "id": 1,
      "email": "yoga@studio.com",
      "lastName": isAdmin ? "Admin" : "Doe",
      "firstName": isAdmin ? "Admin" : "John",
      "admin": isAdmin,
      "createdAt": "2025-08-14",
      "updatedAt": "2025-08-14"
    })

  beforeEach(() => {
    cy.login(true);
  });

  it('should display admin information', () => {

    const mockResponse = getUserMock(true);
    cy.intercept('GET', '/api/user/1', mockResponse)

    cy.get("[data-cy=account-link]").click();

    cy.get("[data-cy=fullname]").should('contain', `Name: ${mockResponse.firstName} ${mockResponse.lastName.toUpperCase()}`);
    cy.get("[data-cy=email]").should('contain', `Email: ${mockResponse.email}`);
    cy.get("[data-cy=admin]").should('exist');
    cy.get("[data-cy=delete]").should('not.exist');
    cy.get("[data-cy=admin]").should('contain', `You are admin`);
    cy.get("[data-cy=create]").should('contain', `August 14, 2025`);
    cy.get("[data-cy=update]").should('contain', `August 14, 2025`);
  })

  it('should display user information', () => {

    const mockResponse = getUserMock(false);
    cy.intercept('GET', '/api/user/1', mockResponse)

    cy.get("[data-cy=account-link]").click();

    cy.get("[data-cy=fullname]").should('contain', `Name: ${mockResponse.firstName} ${mockResponse.lastName.toUpperCase()}`);
    cy.get("[data-cy=email]").should('contain', `Email: ${mockResponse.email}`);
    cy.get("[data-cy=admin]").should('not.exist');
    cy.get("[data-cy=delete]").should('exist');
    cy.get("[data-cy=create]").should('contain', `August 14, 2025`);
    cy.get("[data-cy=update]").should('contain', `August 14, 2025`);
  })

  it('should delete user information', () => {

    const mockResponse = getUserMock(false);
    cy.intercept('GET', '/api/user/1', mockResponse)
    cy.intercept('DELETE', '/api/user/1', {})

    cy.get("[data-cy=account-link]").click();

    cy.get("[data-cy=delete]").should('exist');
    cy.get("[data-cy=delete]").click();

    cy.get(".cdk-overlay-container").should("contain", "Your account has been deleted !");
  })


  it("should go back to home", () => {
    const mockResponse = getUserMock(true);
    cy.intercept('GET', '/api/user/1', mockResponse)

    cy.get("[data-cy=account-link]").click();

    cy.get("[data-cy=back-button]").click();

    cy.url().should("not.contain", "me");
  })


});



