describe('Landing Component', () => {

  it('should display the landing page', () => {
    cy
      .login('user@example.com', 'example');
    cy
      .get('h1').contains('Landing');
  });

  it('should fetch example data from the server', () => {
    cy
      .login('user@example.com', 'example');
    cy
      .get('button.btn').contains('Get Data').click()
      .get('h5').contains('Example Data fetched from server')
      .get('p.server-content').should('not.be.empty');
  });

});
