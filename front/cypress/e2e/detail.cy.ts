import { mockSessionResponse, mockTeacherResponse} from '../support/mock-data';

describe('Detail spec', () => {

  it('should display session information for admin', () => {

    cy.login(true);

    cy.intercept('GET', '/api/session/1', mockSessionResponse)
    cy.intercept('GET', '/api/teacher/1', mockTeacherResponse)

    // Click on the "Detail" button of the first session
    cy.get("[data-cy=detail-button]").first().click();

    cy.get("[data-cy=session-name").should("contain", "Une Session");
    cy.get("[data-cy=teacher-name").should("contain", "Hélène THIERCELIN");
    cy.get("[data-cy=attendees").should("contain", "2 attendees");
    cy.get("[data-cy=date").should("contain", "August 14, 2025");
    cy.get("[data-cy=description").should("contain", "Ceci est un exemple de session");
    cy.get("[data-cy=create").should("contain", "August 14, 2025");
    cy.get("[data-cy=update").should("contain", "August 14, 2025");
    // Only for admin
    cy.get("[data-cy=delete").should("exist");

  })


  it('should display session information for regular user', () => {
    // Login as regular user an go to "/sessions"
    cy.login(false);

    cy.intercept('GET', '/api/session/1', mockSessionResponse)
    cy.intercept('GET', '/api/teacher/1', mockTeacherResponse)

    // Click on the "Detail" button of the first session
    cy.get("[data-cy=detail-button]").first().click();

    cy.get("[data-cy=session-name").should("contain", "Une Session");
    cy.get("[data-cy=teacher-name").should("contain", "Hélène THIERCELIN");
    cy.get("[data-cy=attendees").should("contain", "2 attendees");
    cy.get("[data-cy=date").should("contain", "August 14, 2025");
    cy.get("[data-cy=description").should("contain", "Ceci est un exemple de session");
    cy.get("[data-cy=create").should("contain", "August 14, 2025");
    cy.get("[data-cy=update").should("contain", "August 14, 2025");

    // Only one of participate/unparticipate buttons exists
    cy.get("[data-cy=participate],[data-cy=unparticipate]").should("have.length", 1);
  })


  it('should go back', () => {

    // Login
    cy.login(true);

    cy.intercept('GET', '/api/session/1', mockSessionResponse)
    cy.intercept('GET', '/api/teacher/1', mockTeacherResponse)

    // navigate to detail
    cy.get("[data-cy=detail-button]").first().click();

    // click on the back button
    cy.get("[data-cy=back-button]").click();

    // check if the url has changed
    cy.url().should("not.contain", "detail");

  });


  it('should delete a session as admin', () => {
    // Login as admin
    cy.login(true)

    cy.intercept('GET', '/api/session/1', mockSessionResponse)
    cy.intercept('GET', '/api/teacher/1', mockTeacherResponse)
    cy.intercept('DELETE', '/api/session/1', {})

    // Click on the "Detail" button of the first session
    cy.get("[data-cy=detail-button]").first().click();

    cy.get("[data-cy=delete").should("exist");
    cy.get("[data-cy=delete").click();

    cy.get(".cdk-overlay-container").should("contain", "Session deleted !");
    cy.url().should("not.contain", "detail");
  })

  it('should unparticipate as regular user', () => {
    // Login as regular user
    cy.login(false)

    cy.intercept('GET', '/api/session/1', mockSessionResponse)
    cy.intercept('GET', '/api/teacher/1', mockTeacherResponse)
    cy.intercept('DELETE', '/api/session/1/participate/1', {})

    // Click on the "Detail" button of the first session
    cy.get("[data-cy=detail-button]").first().click();

    cy.get("[data-cy=participate").should("not.exist");

    // Unparticipate cause session update without current user
    cy.intercept('GET', '/api/session/1', {...mockSessionResponse, "users": [2] })

    // Click on "unparticipate"
    cy.get("[data-cy=unparticipate]").should("exist");
    cy.get("[data-cy=unparticipate]").click();

    cy.get("[data-cy=participate]").should("exist");
    cy.get("[data-cy=unparticipate]").should("not.exist");
  })


  it('should participate as regular user', () => {
    // Login as regular user
    cy.login(false)

    cy.intercept('GET', '/api/session/1', {mockSessionResponse, users: []})
    cy.intercept('GET', '/api/teacher/1', mockTeacherResponse)
    cy.intercept('POST', '/api/session/1/participate/1', {})

    // Click on the "Detail" button of the first session
    cy.get("[data-cy=detail-button]").first().click();

    cy.get("[data-cy=unparticipate").should("not.exist");

    // Participate cause session update with current user
    cy.intercept('GET', '/api/session/1', {...mockSessionResponse, "users": [1] })

    // Click on "participate"
    cy.get("[data-cy=participate]").should("exist");
    cy.get("[data-cy=participate]").click();

    cy.get("[data-cy=unparticipate]").should("exist");
    cy.get("[data-cy=participate]").should("not.exist");
  })


});



