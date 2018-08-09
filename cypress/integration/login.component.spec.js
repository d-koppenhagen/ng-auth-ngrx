describe('LogIn Component', () => {

  it('should log a user in if the credentials are valid', () => {
    cy
      .login('user@example.com', 'example');
    cy
      .location('pathname').should('eq', '/')
      .get('p').contains('You logged in user@example.com!')
      .get('a.btn').should('have.length', 0)
      .get('h5.card-title').contains('Current State')
      .get('button.btn').contains('Logout')
      .get('button.btn').contains('Get Data')
      .get('ul>li').should('have.length', 5);
  });

  /**
   * Test can be implemented if the backend will really check the credentials
   */
  /*
  it('should not log a user in if the credentials are invalid', () => {
    cy
      .login('TEST', 'incorrect');
    cy
      .get('p')
      .contains('You logged in user@example.com!')
      .should('not.be.visible');
    cy
      .location('pathname').should('eq', '/login')
      .get('div.alert.alert-danger')
      .contains('Incorrect email and/or password.');
  });
  */

  it('should log an authenticated user out', () => {
    cy
      .login('user@example.com', 'example');
    cy
      .get('p').contains('You logged in user@example.com!')
      .get('button.btn').contains('Logout').click()
    cy
      .location('pathname').should('eq', '/login')
      .get('h1').contains('Login')
      .get('button.btn').contains('Login')
      .get('a.btn').contains('Cancel');
  });

});
