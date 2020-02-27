/// <reference types="Cypress" />
describe("Actividades list test", function(){
    it("Has an Actividades Públicas header", () =>{
        cy.visit("/actividades")
        cy.get("h2").should("contain", "Actividades Públicas")
    })
})