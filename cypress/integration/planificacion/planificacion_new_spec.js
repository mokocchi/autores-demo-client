describe("Planificacion new test", () => {
    before(() => {
        cy.clearLocalStorageCache();
        cy.login()
    })

    beforeEach(() => {
        cy.server()
        cy.route("GET", Cypress.env("api_base_url") + "/me").as("me")
        cy.route("GET", Cypress.env("api_base_url") + "/actividades/2/tareas").as("tareas")
        cy.route("GET", Cypress.env("api_base_url") + "/planificaciones/2").as("planificacion")
        cy.restoreLocalStorageCache();
        cy.visitWithDelWinFetch("/actividad/2/planificacion")
        cy.wait("@me")
        cy.wait("@tareas")
        cy.wait("@planificacion")
        cy.get("#node-1")
    });

    afterEach(() => {
        cy.saveLocalStorageCache();
    });

    it("Has the right header", () => {
        cy.get("h2").should("have.text", "Planificación de tareas")
    })

    it("Has initial nodes", () => {
        cy.get("[class='node start']").as("nodes").should("have.length", 10)
    })

    it("Has a node menu", () => {
        cy.get("[class='node start']").eq(0).click()
        cy.get(".h4").should("contain", "Tarea seleccionada:")
        cy.get(".form-check-input").as("checkboxes").should("have.length", 2)
        cy.get("@checkboxes").eq(0).siblings().should("have.text", "Opcional")
        cy.get("@checkboxes").eq(1).siblings().should("have.text", "Inicial")
        cy.get("[data-cy=agregarConexiones]").should("contain", "Agregar conexiones")
    })

    it("Has an edge menu", () => {
        cy.get("[class='node start']").eq(0).click()
        cy.get("[data-cy=agregarConexiones]").click()
        cy.get("select").select("2")
        cy.get("[data-cy=agregarConexion]").click()
        
        cy.get(".edge-mouse-handler").eq(0).click()

        cy.get(".h4").should("contain", "Conexión")
        cy.contains("Quitar conexión").should("have.class", "btn-danger")
        cy.contains('Desde la tarea "1. Tarea prueba1" hacia la tarea "2. Tarea prueba2"')
    })

    it("Connects nodes", () =>{
        cy.get(".slider-button").as("center")
        cy.get("[class='node start']").as("nodes").eq(0).click()
        cy.get("[data-cy=agregarConexiones]").as("conexiones").click()
        cy.get("select").as("select").select("2")
        cy.get("[data-cy=agregarConexion]").as("conexion").click()

        cy.get("@nodes").eq(1).click()
        cy.get("@conexiones").click()
        cy.get("@select").select("3")
        cy.get("@conexion").click()
        cy.get("@center").click()

        cy.get("@nodes").eq(2).click()
        cy.get("@conexiones").click()
        cy.get("@select").select("4")
        cy.get("@conexion").click()
        cy.get("@center").click()

        cy.get("@nodes").eq(3).click()
        cy.get("@conexiones").click()
        cy.get("@select").select("5")
        cy.get("@conexion").click()
        cy.get("@center").click()

        // cy.get("@nodes").eq(4).click()
        // cy.get("@conexiones").click()
        // cy.get("@select").select("6")
        // cy.get("@conexion").click()
        // cy.get("@center").click()

        cy.get("@nodes").eq(5).click()
        cy.get("@conexiones").click()
        cy.get("@select").select("7")
        cy.get("@conexion").click()
        cy.get("@center").click()

        cy.get("@nodes").eq(6).click()
        cy.get("@conexiones").click()
        cy.get("@select").select("8")
        cy.get("@conexion").click()
        cy.get("@center").click()

        cy.get("@nodes").eq(7).click()
        cy.get("@conexiones").click()
        cy.get("@select").select("9")
        cy.get("@conexion").click()
        cy.get("@center").click()

        cy.get("@nodes").eq(8).click()
        cy.get("@conexiones").click()
        cy.get("@select").select("10")
        cy.get("@conexion").click()
        cy.get("@center").click()
    })

    it("Makes the test graph 1.1", () =>{
        cy.get(".slider-button").as("center")
        cy.get("[class='node start']").as("nodes").eq(0).click()
        cy.get("[data-cy=agregarConexiones]").as("conexiones").click()
        cy.get("select").as("select").select("2")
        cy.get("[data-cy=agregarConexion]").as("conexion").click()

        cy.get("@nodes").eq(1).click()
        cy.get("@conexiones").click()
        cy.get("@select").select("3")
        cy.get("@conexion").click()
        cy.get("@center").click()

        cy.get("@nodes").eq(2).click()
        cy.get("@conexiones").click()
        cy.get("@select").select("4")
        cy.get("@conexion").click()
        cy.get("@center").click()

        cy.get("@nodes").eq(3).click()
        cy.get("@conexiones").click()
        cy.get("@select").select("5")
        cy.get("@conexion").click()
        cy.get("@center").click()

        cy.get("@nodes").eq(2).click()
        cy.get("@conexiones").click()
        cy.get("@select").select("6")
        cy.get("@conexion").click()
        cy.get("@center").click()

        cy.get("@nodes").eq(5).click()
        cy.get("@conexiones").click()
        cy.get("@select").select("7")
        cy.get("@conexion").click()
        cy.get("@center").click()

        cy.get("@nodes").eq(6).click()
        cy.get("@conexiones").click()
        cy.get("@select").select("8")
        cy.get("@conexion").click()
        cy.get("@center").click()

        cy.get("@nodes").eq(7).click()
        cy.get("@conexiones").click()
        cy.get("@select").select("9")
        cy.get("@conexion").click()
        cy.get("@center").click()

        cy.get("@nodes").eq(8).click()
        cy.get("@conexiones").click()
        cy.get("@select").select("10")
        cy.get("@conexion").click()
        cy.get("@center").click()

    })

    it("Makes the test graph 2.1", () =>{
        cy.get(".slider-button").as("center")
        cy.get("[class='node start']").as("nodes").eq(0).click()
        cy.get("[data-cy=agregarConexiones]").as("conexiones").click()
        cy.get("select").as("select").select("2")
        cy.get("[data-cy=agregarConexion]").as("conexion").click()

        cy.get("@nodes").eq(1).click()
        cy.get("@conexiones").click()
        cy.get("@select").select("3")
        cy.get("@conexion").click()
        cy.get("@center").click()

        cy.get("@nodes").eq(2).click()
        cy.get("@conexiones").click()
        cy.get("@select").select("9")
        cy.get("@conexion").click()
        cy.get("@center").click()

        cy.get("@nodes").eq(8).click()
        cy.get("@conexiones").click()
        cy.get("@select").select("4")
        cy.get("[data-cy=mostrarCondicion]").click()
        cy.get("[data-cy=cuando]").as("cuando").select("YES_TASK")
        cy.get("[data-cy=condicionTarea]").as("condicionTarea").select("1")
        cy.get("@conexion").click()
        cy.get("@center").click()

        cy.get("@nodes").eq(8).click()
        cy.get("@conexiones").click()
        cy.get("@select").select("6")
        cy.get("[data-cy=mostrarCondicion]").click()
        cy.get("[data-cy=cuando]").as("cuando").select("NO_TASK")
        cy.get("[data-cy=condicionTarea]").as("condicionTarea").select("1")
        cy.get("@conexion").click()
        cy.get("@center").click()

        cy.get("@nodes").eq(3).click()
        cy.get("@conexiones").click()
        cy.get("@select").select("5")
        cy.get("@conexion").click()
        cy.get("@center").click()

        cy.get("@nodes").eq(5).click()
        cy.get("@conexiones").click()
        cy.get("@select").select("7")
        cy.get("@conexion").click()
        cy.get("@center").click()

        cy.get("@nodes").eq(5).click()
        cy.get("@conexiones").click()
        cy.get("@select").select("8")
        cy.get("@conexion").click()
        cy.get("@center").click()

        cy.get("@nodes").eq(7).click()
        cy.get("@conexiones").click()
        cy.get("@select").select("10")
        cy.get("@conexion").click()
        cy.get("@center").click()

    })
})