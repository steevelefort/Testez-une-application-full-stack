import { faker } from '@faker-js/faker';

describe('Register spec', () => {
  it('Register successfull', () => {
    cy.intercept('POST', '/api/auth/register', { statusCode: 200, })

    cy.visit('/register')

    const getSubmitButton = () => cy.get("[data-cy=submit]");
    const getErrorMessage = () => cy.get("[data-cy=error]");

    const checkField = (field, data, submitMustBeDisabled = true) => {
      // Fill the field and check the validity
      cy.get(`[data-cy=${field}]`).type(data).blur();
      cy.get(`[data-cy=${field}]`).should("have.class", "ng-valid");

      // Clear the field and check if it’s invalid
      cy.get(`[data-cy=${field}]`).clear().blur();
      cy.get(`[data-cy=${field}]`).should("have.class", "ng-invalid");

      // Fill again and check the validity
      cy.get(`[data-cy=${field}]`).type(data).blur();
      cy.get(`[data-cy=${field}]`).should("have.class", "ng-valid");

      // Check the state of the submit button
      if (submitMustBeDisabled) {
        getSubmitButton().should('be.disabled');
      } else {
        getSubmitButton().should('be.enabled');
      }
    }

    // Initial state
    getSubmitButton().should('be.disabled');
    getErrorMessage().should('not.exist');

    // Fill fields and check error management
    checkField("firstName", faker.name.firstName());
    checkField("lastName", faker.name.lastName());
    checkField("email", faker.internet.email());
    checkField("password", "Test123!", false);

    // Click the register button
    getSubmitButton().click();

    // URL must have been updated
    cy.url().should('include', '/login')
  })


  it('print an error message if register fails', () => {
    cy.intercept('POST', '/api/auth/register', { statusCode: 400, })

    cy.visit('/register')

    cy.get("[data-cy=firstName]").type(faker.name.firstName());
    cy.get("[data-cy=lastName]").type(faker.name.lastName());
    cy.get("[data-cy=email]").type(faker.internet.email());
    cy.get("[data-cy=password]").type("Test123!");

    cy.get("[data-cy=submit]").click();

    cy.url().should('include', '/register');
    cy.get("[data-cy=error]").should('contain', 'An error occurred');
  })
});



