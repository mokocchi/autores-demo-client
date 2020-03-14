/// <reference types="Cypress" />
describe("Actividades add tareas test", () => {
    before(() => {
        cy.clearLocalStorageCache();
        cy.login()
    })

    beforeEach(() => {
        cy.server()
        cy.route("GET", Cypress.env("api_base_url") + "/actividades/5/tareas").as("tareas")
        cy.route("GET", Cypress.env("api_base_url") + "/actividades/4/tareas").as("clonedTareas")
        cy.restoreLocalStorageCache();
        cy.visitWithDelWinFetch("/actividad/5?clone=4")
        cy.wait("@tareas")
        cy.wait("@clonedTareas")
    });

    afterEach(() => {
        cy.saveLocalStorageCache();
    });

    it("Has a Elegir tareas header", () => {
        cy.get("h2").should("contain", "Elegir tareas (clonando Actividad test 4)")
    })

    it("Has the correct subtitles and labels", () => {
        cy.contains("Buscar Tarea")
        cy.get("#searchCriteria").children().first().should("contain.text", "Elegí un criterio")
        cy.contains("Mis tareas")
        cy.get("#formTarea").children().first().should("contain.text", "Elegí una tarea")
        cy.contains("Tareas de la actividad (10 más)")
        cy.contains("Nueva").parent().should("have.attr", "href", "/actividad/1/nuevaTarea")
        cy.get("ul").children().as("pendientes").should("have.length", 10)
        cy.get("@pendientes").eq(0).should("contain", "Reemplazar a la tarea Tarea prueba1")
        cy.contains("Planificación")
        cy.get("[class='node start']").as("nodes").should("have.length", 10)
    })

    it("Populates the tareas select", () => {
        cy.get("#formTarea").children().should("have.length.greaterThan", 10)
    })

    it("Prevents submitting actividades without tareas", () => {
        cy.get("[data-cy^=quitar]").click({ multiple: true })
        cy.contains("Guardar").click()
        cy.contains("No se eligieron tareas").should("have.class", "text-danger")
    })

    it("Deletes items and submits the form", () => {
        cy.server()
        cy.route("GET", Cypress.env("api_base_url") + "/tareas/1").as("tarea1")
        cy.route("GET", Cypress.env("api_base_url") + "/tareas/2").as("tarea2")
        cy.route("GET", Cypress.env("api_base_url") + "/tareas/3").as("tarea3")
        cy.route("GET", Cypress.env("api_base_url") + "/tareas/4").as("tarea4")
        cy.route("GET", Cypress.env("api_base_url") + "/tareas/5").as("tarea5")
        cy.route("GET", Cypress.env("api_base_url") + "/tareas/6").as("tarea6")
        cy.route("GET", Cypress.env("api_base_url") + "/tareas/7").as("tarea7")
        cy.route("GET", Cypress.env("api_base_url") + "/tareas/8").as("tarea8")
        cy.route("GET", Cypress.env("api_base_url") + "/tareas/9").as("tarea9")
        cy.route("GET", Cypress.env("api_base_url") + "/tareas/10").as("tarea10")
        cy.route("PUT", Cypress.env("api_base_url") + "/actividades/1/tareas").as("tareas")
        cy.get("[data-cy^=quitar]").click({ multiple: true })
        
        
        cy.get("#formTarea").as("formTarea").select("6")
        cy.wait("@tarea6")
        cy.contains("Agregar").click()
        cy.contains("Tareas de la actividad (9 más)")
        cy.get("#formTarea").as("formTarea").select("7")
        cy.wait("@tarea7")
        cy.contains("Agregar").click()
        cy.get("#formTarea").as("formTarea").select("8")
        cy.wait("@tarea8")
        cy.contains("Agregar").click()
        cy.get("#formTarea").as("formTarea").select("9")
        cy.wait("@tarea9")
        cy.contains("Agregar").click()
        cy.get("#formTarea").as("formTarea").select("10")
        cy.wait("@tarea10")
        cy.contains("Agregar").click()
        cy.contains("Tareas de la actividad (5 más)")
        
        cy.get("#formTarea").as("formTarea").select("1")
        cy.wait("@tarea1")
        cy.contains("Agregar").click()
        cy.get("#formTarea").as("formTarea").select("2")
        cy.wait("@tarea2")
        cy.contains("Agregar").click()
        cy.get("#formTarea").as("formTarea").select("3")
        cy.wait("@tarea3")
        cy.contains("Agregar").click()
        cy.get("#formTarea").as("formTarea").select("4")
        cy.wait("@tarea4")
        cy.contains("Agregar").click()
        cy.get("#formTarea").as("formTarea").select("5")
        cy.wait("@tarea5")
        cy.contains("Agregar").click()
        
        cy.get(".list-group").children().should("have.length", 10)
    })
})