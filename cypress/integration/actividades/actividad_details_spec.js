/// <reference types="Cypress" />
describe("Actividades add tareas test", () => {
    before(() => {
        cy.clearLocalStorageCache();
        cy.login()
    })

    beforeEach(() => {
        cy.server()
        cy.route("GET", Cypress.env("api_base_url") + "/public/actividades/1/tareas").as("tareas")
        cy.restoreLocalStorageCache();
        cy.visitWithDelWinFetch("/actividad/1/mostrar")
        cy.wait("@tareas")
    });

    afterEach(() => {
        cy.saveLocalStorageCache();
    });

    it("Has an Actividad header", () => {
        cy.get("h2").should("contain", "Actividad")
        cy.contains("Nombre:").should("contain", "Actividad test 1")
        cy.contains("Objetivo:").should("contain", "Probar la lista de actividades")
        cy.contains("Idioma:").should("contain", "Español")
        cy.contains("Dominio:").should("contain", "Pruebas")
        cy.contains("Descargar").should("have.attr", "href", `${Cypress.env("api_base_url")}/public/actividades/1/data` )
        cy.get("ul").children().as("lis").should("have.length", 2)
        cy.get("@lis").eq(0).should("contain", "Tarea prueba1")
        cy.get("@lis").eq(1).should("contain", "Tarea prueba3")
        cy.get("[data-cy=graphShow]").as("graphShow")
        cy.get("[class='node start']").as("nodes").should("have.length", 2)
    })
})