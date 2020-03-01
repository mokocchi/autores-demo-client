/// <reference types="Cypress" />
describe("Actividades form test (recolección)", () => {
    before(() => {
        cy.clearLocalStorageCache();
        cy.login()
    })

    beforeEach(() => {
        cy.restoreLocalStorageCache();
    })

    it("Submits a Recolección", () => {
        cy.server()
        cy.route("GET", Cypress.env("api_base_url") + "/me").as("me")
        cy.route("GET", Cypress.env("api_base_url") + "/actividades/1/tareas").as("tareas")
        cy.route("GET", Cypress.env("api_base_url") + "/public/tipos-tarea").as("tipos-planificacion")
        cy.route("GET", Cypress.env("api_base_url") + "/public/dominios").as("dominios")
        cy.route("GET", Cypress.env("api_base_url") + "/public/estados").as("estados")
        cy.restoreLocalStorageCache();
        cy.visitWithDelWinFetch("/actividad/1")
        cy.wait("@tareas")

        cy.route("GET", Cypress.env("api_base_url") + "tareas/1").as("tarea1")
        cy.route("GET", Cypress.env("api_base_url") + "tareas/2").as("tarea2")
        cy.route("PUT", Cypress.env("api_base_url") + "/actividades/1/tareas").as("tareas")
        cy.get("#formTarea").as("formTarea").select("1")
        cy.wait("@tarea1")
        cy.contains("Agregar").click()
        cy.get("#formTarea").as("formTarea").select("2")
        cy.wait("@tarea2")
        cy.contains("Agregar").click()
        cy.contains("Nueva").click()
        
        cy.wait("@me")
        cy.wait("@tipos-planificacion")
        cy.wait("@dominios")
        cy.wait("@estados")
        
        cy.get("#formNombre").type("Nombre")
        cy.get("#formConsigna").type("Consigna")
        cy.get("#formTipo").select("8")
        cy.get("#formDominio").select("1")
        cy.get("#formEstado").select("1")

        const fileName = 'suelo.png';

        cy.fixture(fileName).then(fileContent => {
            cy.get('[data-cy="file-input"]').upload({ fileContent, fileName, mimeType: 'image/png' });
        });

        cy.get("[data-cy=formOption]").type("Uno{enter}Dos{enter}Tres")
        cy.get("[data-cy=buttonAgregarOption]").click()
        cy.get(".list-group").children().should("have.length", 3)

        cy.get("[data-cy=elements] input").as("checkboxes").eq(1).check()
        cy.get("@checkboxes").eq(2).check()
        cy.get("@checkboxes").eq(5).check()

        cy.contains("Guardar").click()
    })

})