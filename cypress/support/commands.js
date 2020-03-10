import 'cypress-file-upload';

Cypress.Commands.add('login', () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:8000/api/oauth/v2/token',
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

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorageCache", () => {
    Object.keys(localStorage).forEach(key => {
        LOCAL_STORAGE_MEMORY[key] = localStorage[key];
    });
});

Cypress.Commands.add("restoreLocalStorageCache", () => {
    Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
        localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
});

Cypress.Commands.add("clearLocalStorageCache", () => {
    localStorage.clear();
    LOCAL_STORAGE_MEMORY = {};
});

Cypress.Commands.add('visitWithDelWinFetch', (path, opts = {}) => {
    cy.visit(
        path,
        Object.assign(opts, {
            onBeforeLoad(win) {
                delete win.fetch;
            },
        })
    );
});