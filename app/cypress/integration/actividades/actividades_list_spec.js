/// <reference types="Cypress" />
describe("Actividades list test", () => {
    beforeEach(() => {
        cy.visit("/actividades")
    })

    it("Has an Actividades Públicas header", () => {
        cy.get("h2").should("contain", "Actividades públicas")
    })

    it("Shows the first page of results", () => {
        cy.get("ul").children().should("have.length", 10)
    })

    it("Has a link to mostrar actividad", () => {
        cy.contains("Actividad test 5").should("have.attr", "href", "/actividad/5/mostrar")
    })
})