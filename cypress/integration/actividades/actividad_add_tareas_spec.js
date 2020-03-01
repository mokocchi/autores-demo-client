/// <reference types="Cypress" />
describe("Actividades add tareas test", () => {
    before(() => {
        cy.clearLocalStorageCache();
        cy.login()
    })

    beforeEach(() => {
        cy.server()
        cy.route("GET", Cypress.env("api_base_url") + "/actividades/1/tareas").as("tareas")
        cy.restoreLocalStorageCache();
        cy.visitWithDelWinFetch("/actividad/1")
        cy.wait("@tareas")
    });

    afterEach(() => {
        cy.saveLocalStorageCache();
    });

    it("Has a Elegir tareas header", () => {
        cy.get("h2").should("contain", "Elegir tareas")
    })

    it("Has the correct subtitles and labels", () => {
        cy.contains("Buscar Tarea")
        cy.get("#searchCriteria").children().first().should("contain.text", "Elegí un criterio")
        cy.contains("Mis tareas")
        cy.get("#formTarea").children().first().should("contain.text", "Elegí una tarea")
        cy.contains("Tareas de la actividad")
        cy.contains("Nueva").parent().should("have.attr", "href", "/actividad/1/nuevaTarea")
    })

    it("Populates the tareas select", () => {
        cy.get("#formTarea").children().should("have.length.greaterThan", 10)
    })

    it("Prevents submitting actividades without tareas", () => {
        cy.contains("Guardar").click()
        cy.contains("No se eligieron tareas").should("have.class", "text-danger")
    })

    it.only("Deletes items and submits the form", () => {
        cy.server()
        cy.route("GET", Cypress.env("api_base_url") + "tareas/1").as("tarea1")
        cy.route("GET", Cypress.env("api_base_url") + "tareas/2").as("tarea2")
        cy.route("GET", Cypress.env("api_base_url") + "tareas/3").as("tarea3")
        cy.route("PUT", Cypress.env("api_base_url") + "/actividades/1/tareas").as("tareas")
        cy.get("#formTarea").as("formTarea").select("1")
        cy.wait("@tarea1")
        cy.contains("Agregar").click()
        cy.get("#formTarea").as("formTarea").select("2")
        cy.wait("@tarea2")
        cy.contains("Agregar").click()
        cy.get("#formTarea").as("formTarea").select("3")
        cy.wait("@tarea3")
        cy.contains("Agregar").click()

        cy.get(".list-group").children().should("have.length", 3)

        cy.get("[data-cy=quitar_2]").click()
        cy.get(".list-group").children().should("have.length", 2)

        cy.contains("Guardar").click()
        cy.wait("@tareas")
        cy.contains("Continuar").parent().should("have.attr", "href", "/actividad/1/planificacion")
        cy.get("@tareas").should((xhr) => {
            expect(xhr.url).to.match(/v1.0\/actividades\/1\/tareas$/)
            expect(xhr.status).to.eq(200)
            expect(xhr.method).to.eq("PUT")
            expect(xhr.requestHeaders).to.have.property('authorization').match(/^Bearer /)
            
            expect(xhr.request.body).to.have.property("tareas").to.deep.eq([1,3])
        })
    })
})