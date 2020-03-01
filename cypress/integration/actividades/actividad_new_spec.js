/// <reference types="Cypress" />
describe("Actividades form test", () => {
    before(() => {
        cy.clearLocalStorageCache();
        cy.login()
    })
    
    beforeEach(() => {
        cy.restoreLocalStorageCache();
        cy.visit("/nuevaActividad")
    });

    afterEach(() => {
        cy.saveLocalStorageCache();
    });

    it("Has a Crear actividad header", () => {
        cy.get("h2").should("contain", "Crear actividad")
    })

    it("Requires all fields", () => {
        cy.contains("Guardar").click()
        cy.contains("Falta nombre").should("have.class", "text-danger")
        cy.contains("Falta objetivo").should("have.class", "text-danger")
        cy.contains("Falta idioma").should("have.class", "text-danger")
        cy.contains("Falta tipo de planificación").should("have.class", "text-danger")
        cy.contains("Falta dominio").should("have.class", "text-danger")
        cy.contains("Falta estado").should("have.class", "text-danger")
    })

    it("Accepts input on Nombre", () => {
        const typedText = "Actividad cypress"
        cy.get("#formNombre")
            .type(typedText)
            .should("have.value", typedText)
    })


    it("Accepts input on Objetivo", () => {
        const typedText = "Probar crear una actividad"
        cy.get("#formObjetivo")
        .type(typedText)
        .should("have.value", typedText)
    })


    it("Accepts changes on Idioma", () => {
        cy.get("#formIdioma")
        .select("1")
        .should("have.value", "1")
    })

    it("Accepts changes on Tipo planificacion", () => {
        cy.get("#formTipoPlanificacion")
        .select("1")
        .should("have.value", "1")
    })

    it("Can create dominios", () => {
        const typedValue = "Prueba 1"
        cy.get("#formNewDominio")
        .click()
        .type(typedValue + "{enter}")
        .should("not.have.value")
        cy.get("#formDominio").children().should("contain.text", typedValue)
    })

    it("Can't create a dominio twice", () => {
        const typedValue = "Prueba 2"
        cy.get("#formNewDominio")
        .click()
        .type(typedValue)
        cy.contains("Agregar").click()
        cy.get("#formNewDominio").should("not.have.value")
        cy.get("#formDominio").children().should("contain.text", typedValue)
        cy.get("#formNewDominio")
        .click()
        .type(typedValue + "{enter}")
        cy.contains("Ya existe un dominio con el mismo nombre").should("have.class", "text-danger")
    })

    it("Accepts changes on Dominio", () => {
        cy.get("#formDominio")
        .select("1")
        .should("have.value", "1")
    })

    it("Accepts changes on estado", () => {
        cy.get("#formEstado")
        .select("1")
        .should("have.value", "1")
    })

    it("Submits the form", () => {
        cy.get("#formNombre").type("Nombre")
        cy.get("#formObjetivo").type("Objetivo")
        cy.get("#formIdioma").select("1")
        cy.get("#formTipoPlanificacion").select("1")
        cy.get("#formDominio").select("1")
        cy.get("#formEstado").select("1")
        cy.contains("Guardar").click()
        cy.contains("Continuar").parent().should("have.attr", "href").and("match", /^\/actividad\/\d+$/)
    })
})