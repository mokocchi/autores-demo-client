/// <reference types="Cypress" />
describe("Actividades form test", () => {
    before(() => {
        cy.clearLocalStorageCache();
        cy.login()
    })

    beforeEach(() => {
        cy.server()
        cy.route("GET", Cypress.env("api_base_url") + "/me").as("me")
        cy.route("GET", Cypress.env("api_base_url") + "/public/idiomas").as("idiomas")
        cy.route("GET", Cypress.env("api_base_url") + "/public/tipos-planificacion").as("tipos-planificacion")
        cy.route("GET", Cypress.env("api_base_url") + "/public/dominios").as("dominios")
        cy.route("GET", Cypress.env("api_base_url") + "/public/estados").as("estados")
        cy.restoreLocalStorageCache();
        cy.visitWithDelWinFetch("/nuevaActividad")
        cy.wait("@me")
        cy.wait("@idiomas")
        cy.wait("@tipos-planificacion")
        cy.wait("@dominios")
        cy.wait("@estados")
        cy.contains("Dominio")
    });

    afterEach(() => {
        cy.saveLocalStorageCache();
    });

    it("Has a Crear actividad header", () => {
        cy.get("h2").should("contain", "Crear actividad")
    })

    it("Has correct form labels, placeholders and buttons", () => {
        cy.get("#formNombre").as("formNombre").should("have.attr", "placeholder", "Nombre")
        cy.get("@formNombre").siblings().first().should("contain.text", "Nombre").should("have.class", "form-label")

        cy.get("#formObjetivo").as("formObjetivo").should("have.attr", "placeholder", "Objetivo")
        cy.get("@formObjetivo").siblings().first().should("contain.text", "Objetivo").should("have.class", "form-label")

        cy.get("#formIdioma").as("formIdioma").siblings().first().should("contain.text", "Idioma")
        cy.get("@formIdioma").children().first().should("contain.text", "Elegí un idioma").should("be.selected")

        cy.get("#formTipoPlanificacion").as("formTipoPlanificacion").siblings().first().should("contain.text", "Tipo de planificación")
        cy.get("@formTipoPlanificacion").children().first().should("contain.text", "Elegí un tipo").should("be.selected")

        cy.get("#formDominio").as("formDominio").siblings().first().should("contain.text", "Dominio")
        cy.get("@formDominio").children().first().should("contain.text", "Elegí un dominio").should("be.selected")

        cy.get("#formEstado").as("formEstado").siblings().first().should("contain.text", "Estado")
        cy.get("@formEstado").children().first().should("contain.text", "Elegí un estado").should("be.selected")

        cy.get("#formNewDominio").should("have.attr", "placeholder", "Nuevo dominio")

        cy.contains("Agregar").as("agregar-btn").should("have.class", "btn-success")
        cy.get("@agregar-btn").should("have.attr", "disabled")

        cy.contains("Guardar").should("have.class", "btn-info")
    })

    it("Populates the select fields", () => {
        cy.get("#formIdioma").children().should("have.length", 4)

        cy.get("#formTipoPlanificacion").children().should("have.length", 4)

        cy.get("#formDominio").children().should("have.length.greaterThan", 1)

        cy.get("#formEstado").children().should("have.length", 3)
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
        cy.route("POST", Cypress.env("api_base_url") + "actividades").as("actividades")
        cy.get("#formNombre").type("Nombre")
        cy.get("#formObjetivo").type("Objetivo")
        cy.get("#formIdioma").select("1")
        cy.get("#formTipoPlanificacion").select("1")
        cy.get("#formDominio").select("1")
        cy.get("#formEstado").select("1")
        cy.contains("Guardar").click()
        cy.wait("@actividades")
        cy.contains("Continuar").parent().should("have.attr", "href").and("match", /^\/actividad\/\d+$/)
        cy.get("@actividades").should((xhr) => {
            expect(xhr.url).to.match(/v1.0\/actividades$/)
            expect(xhr.status).to.eq(201)
            expect(xhr.method).to.eq("POST")
            expect(xhr.requestHeaders).to.have.property('authorization').match(/^Bearer /)
            
            expect(xhr.request.body).to.have.property("nombre", "Nombre")
            expect(xhr.request.body).to.have.property("objetivo", "Objetivo")
            expect(xhr.request.body).to.have.property("idioma", "1")
            expect(xhr.request.body).to.have.property("tipoPlanificacion", "1")
            expect(xhr.request.body).to.have.property("dominio", "1")
            expect(xhr.request.body).to.have.property("estado", "1")
        })
    })
})