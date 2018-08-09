describe('SignUp Component', () => {

  it('should sign a user up', () => {
    cy
      .signup('user@example.com', 'example');
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
  it('should throw an error if the email is already is use', () => {
    cy
      .signup('in@use.com', 'test');
    cy
      .get('p')
      .contains('You logged in user@example.com!')
      .should('not.be.visible');
    cy
      .location('pathname').should('eq', '/signup')
      .get('div.alert.alert-danger')
      .contains('That email is already in use.');
  });
  */

});
