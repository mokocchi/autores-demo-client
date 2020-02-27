/// <reference types="Cypress" />
describe("My First Test", function() {
    it('Visits the autoresDemo frontend', function() {
        cy.visit('http://localhost:3000')

        cy.contains('Lista Actividades').click()
      })
});
