import { mockSessionResponse, mockTeacherResponse, mockTeachersResponse } from '../support/mock-data';
import { faker } from '@faker-js/faker';

describe('Form spec', () => {

  it("should save a new session", () => {

    const checkField = (field, data) => {
      // Fill the field and check the validity
      cy.get(`[data-cy=${field}]`).type(data).blur();
      cy.get(`[data-cy=${field}]`).should("have.class", "ng-valid");

      // Clear the field and check if it’s invalid
      cy.get(`[data-cy=${field}]`).clear().blur();
      cy.get(`[data-cy=${field}]`).should("have.class", "ng-invalid");

      // Fill again and check the validity
      cy.get(`[data-cy=${field}]`).type(data).blur();
      cy.get(`[data-cy=${field}]`).should("have.class", "ng-valid");

    }


    cy.login(true);

    cy.intercept('GET', '/api/session/1', mockSessionResponse)
    cy.intercept('GET', '/api/teacher/1', mockTeacherResponse)
    cy.intercept('GET', '/api/teacher', mockTeachersResponse)
    cy.intercept('POST', '/api/session', {})

    cy.get("[data-cy=create-button]").click();

    checkField('name', faker.lorem.words(3));
    checkField('date', "2025-08-14");
    checkField('description', faker.lorem.words(10));

    cy.get("[data-cy=teacher] .mat-select-trigger").click();
    cy.get('mat-option').first().click(); // Sélectionne la première option

    cy.get("[data-cy=submit]").should('be.enabled');
    cy.get("[data-cy=submit]").click();


    cy.url().should("not.contain", "create");

  })


  it("should update a session", () => {

    const checkField = (field, data) => {
      // Fill the field and check the validity
      cy.get(`[data-cy=${field}]`).type(data).blur();
      cy.get(`[data-cy=${field}]`).should("have.class", "ng-valid");

      // Clear the field and check if it’s invalid
      cy.get(`[data-cy=${field}]`).clear().blur();
      cy.get(`[data-cy=${field}]`).should("have.class", "ng-invalid");

      // Fill again and check the validity
      cy.get(`[data-cy=${field}]`).type(data).blur();
      cy.get(`[data-cy=${field}]`).should("have.class", "ng-valid");

    }

    cy.login(true);

    cy.intercept('GET', '/api/session/1', mockSessionResponse)
    cy.intercept('GET', '/api/teacher/1', mockTeacherResponse)
    cy.intercept('GET', '/api/teacher', mockTeachersResponse)
    cy.intercept('PUT', '/api/session/1', {})

    // Click on the "Edit" button of the first session
    cy.get("[data-cy=edit-button]").first().click();

    cy.url().should("contain", "update");

    checkField('name', faker.lorem.words(3));
    checkField('date', "2025-08-15");
    checkField('description', faker.lorem.words(10));

    cy.get("[data-cy=teacher] .mat-select-trigger").click();
    cy.get('mat-option').first().click(); // Sélectionne la première option

    cy.get("[data-cy=submit]").should('be.enabled');
    cy.get("[data-cy=submit]").click();

    cy.url().should("not.contain", "update");

  })


});
