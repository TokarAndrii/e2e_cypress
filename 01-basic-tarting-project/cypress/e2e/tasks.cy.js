/// <reference types="Cypress" />
describe('tasks page interaction', () => {
    it('should open and close new task modal', () => {
      cy.visit('http://localhost:5173/')
      cy.get('button').contains('Add Task').click()
      cy.get('.backdrop').click({force: true})
      cy.get('.backdrop').should('not.exist')
      cy.get('.modal').should('not.exist')

      cy.get('button').contains('Add Task').click()
      cy.contains('Cancel').click()
    })
  
    it('should create new task', () => {
      cy.visit('http://localhost:5173/')
      cy.get('button').contains('Add Task').click()
      cy.get('input#title').type('New task title')
      cy.get('textarea#summary').type('New task description')
      cy.get('.modal button').contains('Add Task').click()
      cy.get('.backdrop').should('not.exist')
      cy.get('.modal').should('not.exist')

      cy.get('.task-list').should('have.length', 1)
      cy.get('.task h2').contains('New task title')
      cy.get('.task p').contains('New task description')
    })

    it('should validate input while creating new task', () => {
      cy.visit('http://localhost:5173/')
      cy.get('button').contains('Add Task').click()
      cy.get('.modal button').contains('Add Task').click()
      cy.contains('Please provide values') //check for partial text
    })

    it('should filter tasks', () => {
      cy.visit('http://localhost:5173/')
      cy.get('button').contains('Add Task').click()
      cy.get('input#title').type('New task title')
      cy.get('textarea#summary').type('New task description')
      cy.get('#category').select('urgent')
      cy.get('.modal button').contains('Add Task').click()
      cy.get('.task-list').should('have.length', 1)
      cy.get('#filter').select('moderate')
      cy.get('.task-list').should('have.length', 0)
      cy.get('#filter').select('urgent')
      cy.get('.task-list').should('have.length', 1)
      cy.get('#filter').select('all')
      cy.get('.task-list').should('have.length', 1)
    })

    it('should add multiple tasks in certain way', () => {
      cy.visit('http://localhost:5173/')
      cy.get('button').contains('Add Task').click()
      cy.get('input#title').type('New task title 1')
      cy.get('textarea#summary').type('New task description 1')
      cy.get('.modal button').contains('Add Task').click()
      cy.get('.task').should('have.length', 1)

      cy.get('button').contains('Add Task').click()
      cy.get('input#title').type('New task title 2')
      cy.get('textarea#summary').type('New task description 2')
      cy.get('.modal button').contains('Add Task').click()
      cy.get('.task').should('have.length', 2)

      cy.get('.task').eq(0).contains('New task title 1') //first task
      cy.get('.task').eq(1).contains('New task title 2') //second task


    })
  })