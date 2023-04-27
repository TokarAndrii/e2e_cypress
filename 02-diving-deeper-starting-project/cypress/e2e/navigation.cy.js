///<reference types="Cypress"/>

describe('page navigation', () => {
  it('should navigate between pages', () => {
    cy.visit('http://localhost:5173/')
    //use for select  elements by attribute data-cy="header-about-link" 
    cy.get('[data-cy="header-about-link"]').click()
    cy.location('pathname').should('equal', '/about') //about page

    cy.get('[data-cy="header-home-link"]').click()
    cy.location('pathname').should('equal', '/') //home page
  })

  it('contact form', () => {
    cy.visit('http://localhost:5173/about')
    cy.get('[data-cy="contact-input-message"]').type('Hello world')
    cy.get('[data-cy="contact-input-name"]').type('John Doe')
    cy.get('[data-cy="contact-btn-submit"]').should('not.have.attr', 'disabled')
    cy.get('[data-cy="contact-input-email"]').type('test@gmail.com')
    cy.get('[data-cy="contact-btn-submit"]').contains('Send Message')
    cy.get('[data-cy="contact-btn-submit"]').click()
    cy.get('[data-cy="contact-btn-submit"]').contains('Sending...')
    cy.get('[data-cy="contact-btn-submit"]').should('have.attr', 'disabled')
  })

  it('contact form other test way', () => {
    cy.visit('http://localhost:5173/about')
    cy.get('[data-cy="contact-input-message"]').type('Hello world')
    cy.get('[data-cy="contact-input-name"]').type('John Doe')
    cy.get('[data-cy="contact-input-email"]').type('test@gmail.com')
    cy.get('[data-cy="contact-btn-submit"]').should('not.have.attr', 'disabled')
    .contains('Send Message')
    .click()

    //alias
    cy.get('[data-cy="contact-btn-submit"]').as('submitBtn')
    cy.get('@submitBtn').contains('Sending...')
    cy.get('@submitBtn').should('have.attr', 'disabled')
  })
})