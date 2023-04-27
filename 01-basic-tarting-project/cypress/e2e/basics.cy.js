/// <reference types="Cypress" />
describe('basic tasks page', () => {
  it('should render main image', () => {
    cy.visit('http://localhost:5173/')
    //cy.get('.main-header ').get('img') dont look inside elem 
    //use instead y.get('.main-header ').find('img')
    cy.get('.main-header img') //pass css selector
  })

  it('should display page title', () => {
    cy.visit('http://localhost:5173/')
    cy.get('h1').should('have.length', 1)
    cy.get('h1').contains('React Tasks')
  })
})