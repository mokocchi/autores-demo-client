describe("Header test", () => {
    it("Shows a iniciar sesión button when not logged in", () => {
        cy.visit("/")
        cy.get("[data-cy=iniciarSesionButton]").as("loginButton").should("have.text", "Iniciar sesión con Google")
        cy.get("@loginButton").should("have.class", "btn-outline-dark")
    })

    it("Shows a cerrar sesión button when logged in", () => {
        cy.server()
        cy.route("GET", Cypress.env("api_base_url") + "/me").as("me")
        cy.login()
        cy.visitWithDelWinFetch("/")
        cy.wait("@me")
        cy.get("[data-cy=cerrarSesionButton]").should("have.text", "Cerrar sesión")
    })
})