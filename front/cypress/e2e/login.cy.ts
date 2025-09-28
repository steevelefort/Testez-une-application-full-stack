import { mockUser } from '../support/mock-data';

describe('Login spec', () => {

  it('Login successfull', () => {
    cy.visit('/login')

    cy.intercept('POST', '/api/auth/login', {
      body: mockUser,
    })

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      []).as('session')

    cy.get('[data-cy=email]').type("yoga@studio.com")
    cy.get('[data-cy=password]').type(`${"test!1234"}{enter}{enter}`)

    cy.url().should('include', '/sessions')
  })

  it('fail to Login', () => {
    cy.visit('/login')

    cy.intercept('POST', '/api/auth/login', {
      body: mockUser,
      statusCode: 400
    })

    cy.get('[data-cy=email]').type("yoga@studio.com")
    cy.get('[data-cy=password]').type(`${"test!1234"}{enter}{enter}`)

    cy.get("[data-cy=error]").should('be.visible')
    cy.get("[data-cy=error]").should('contain','An error occurred')

  })
});
