/// <reference types="Cypress" />
describe("Actividades form test", () => {
    before(() => {
        cy.clearLocalStorageCache();
        cy.login()
        cy.visit("/nuevaActividad")
    })

    beforeEach(() => {
        cy.restoreLocalStorageCache();
    });

    afterEach(() => {
        cy.saveLocalStorageCache();
    });

    it("Has a Crear actividad header", () => {
        cy.get("h2").should("contain", "Crear actividad")
    })

    it("Requires a Nombre", () => {
        cy.contains("Guardar").click()
        cy.get(".text-danger").should("contain", "Falta nombre")
    })

    it("Accepts input on Nombre", () => {
        const typedText = "Actividad cypress"
        cy.get("#formNombre")
            .type(typedText)
            .should("have.value", typedText)
    })

    it("Requires an Objetivo", () => {
        cy.contains("Guardar").click()
        cy.get(".text-danger").should("contain", "Falta objetivo")
    })

    it("Accepts input on Objetivo", () => {
        const typedText = "Probar crear una actividad"
        cy.get("#formObjetivo")
        .type(typedText)
        .should("have.value", typedText)
    })

    it("Requires an Idioma", () => {
        cy.contains("Guardar").click()
        cy.get(".text-danger").should("contain", "Falta idioma")
    })

    it("Accepts changes on Idioma", () => {
        cy.get("#formObjetivo")
        .type(typedText)
        .should("have.value", typedText)
    })
})