Cypress.Commands.add('login', (email, password) => {
  cy
    .visit('/')
    .get('button.btn').contains('Login').click()
    .get('form input[name="email"]').clear().type(email)
    .get('form input[name="password"]').clear().type(password)
    .get('button[type="submit"]').click();
});

Cypress.Commands.add('signup', (email, password) => {
  cy
    .visit('/')
    .get('button.btn, a').contains('Signup').click()
    .get('form input[name="email"]').clear().type(email)
    .get('form input[name="password"]').clear().type(password)
    .get('button[type="submit"]').click();
});
