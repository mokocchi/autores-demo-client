/// <reference types="Cypress" />
describe("Actividades list test", function(){
    it("Has a Mis actividades header", () =>{
        cy.login()

        cy.visit("/mis-actividades")
        cy.get("h2").should("contain", "Mis actividades")
    })
})