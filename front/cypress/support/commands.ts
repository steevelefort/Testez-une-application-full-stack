// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --

Cypress.Commands.add('login', (isAdmin = true) => {

  cy.visit('/login')

  const mockResponse = {
    token: "xxxxxxx",
    type: "Bearer",
    id: 1,
    username: isAdmin ? "Admin" : "User",
    firstName: isAdmin ? "Admin" : "John",
    lastName: isAdmin ? "Admin" : "Doe",
    admin: isAdmin
  };

    const mockAllSessionsResponse = [{
      "id": 1,
      "name": "Une session",
      "date": "2025-08-14",
      "teacher_id": 1,
      "description": "Ceci est un exemple de session",
      "users": [1,2],
      "createdAt": "2025-08-14",
      "updatedAt": "2025-08-14"
    },
    {
      "id": 2,
      "name": "Une session",
      "date": "2025-08-14",
      "teacher_id": 1,
      "description": "Ceci est un exemple de session",
      "users": [3],
      "createdAt": "2025-08-14",
      "updatedAt": "2025-08-14"
    }];

  cy.intercept('POST', '/api/auth/login', {
    body: mockResponse,
  })

  cy.intercept(
    {
      method: 'GET',
      url: '/api/session',
    },
    []).as('session')

    cy.intercept('GET', '/api/session', mockAllSessionsResponse)

  cy.get('input[formControlName=email]').type("yoga@studio.com")
  cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

  // cy.url().should('include', '/sessions');
})





