// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:8080/api/oauth/v2/token',
        form: true,
        body: {
            client_id: Cypress.env("client_id"),
            client_secret: Cypress.env("client_secret")
        },
        headers: {
            'X-AUTH-CREDENTIALS': true,
        },
    })
        .then((resp) => {
            window.localStorage.setItem('auth.token', JSON.stringify({ accessToken: resp.body.access_token, expiresAt: Date.now() + resp.body.expires_in * 1000 }))
        })
})