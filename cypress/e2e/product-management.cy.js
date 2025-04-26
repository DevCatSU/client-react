describe('Product Management E2E Flow', () => {
  const productName = 'Cypress Test Product';
  const updatedName = 'Cypress Updated Product';

  it('should load the product list page', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Product Management', { timeout: 5000 }).should('be.visible');
    cy.contains('Product List').should('be.visible');
  });

  it('should add a new product', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Add New product').click();

    cy.get('input[placeholder="Name"]').type(productName);
    cy.get('textarea').type('This is a test description');
    cy.get('input[placeholder="Price"]').type('100');
    cy.get('input[type="checkbox"]').check();

    cy.intercept('POST', '**/products').as('addProduct');
    cy.get('button').contains('Add Product').click();
    cy.wait('@addProduct');

    cy.intercept('GET', '**/products').as('getProductsAfterAdd');
    cy.visit('http://localhost:3000');
    cy.wait('@getProductsAfterAdd');

    cy.contains('Product List').should('be.visible');
    cy.contains(productName, { timeout: 5000 }).should('be.visible');
  });

  it('should view the product detail', () => {
    cy.visit('http://localhost:3000');

    cy.contains(productName, { timeout: 5000 }).should('be.visible')
      .parent('tr')
      .within(() => {
        cy.contains('Detail').click();
      });

    cy.contains('Product Detail', { timeout: 5000 }).should('be.visible');
    cy.contains(productName).should('be.visible');
    cy.contains('Back to Product List').click();
    cy.contains('Product List').should('be.visible');
  });

  it('should edit the product', () => {
    cy.visit('http://localhost:3000');

    cy.contains(productName, { timeout: 5000 }).should('be.visible')
      .parent('tr')
      .within(() => {
        cy.contains('Edit').click();
      });

    cy.get('input[placeholder="Name"]').clear().type(productName);
    cy.get('textarea').clear().type('Updated description by Cypress');
    cy.get('input[placeholder="Price"]').clear().type('200');
    cy.get('input[type="checkbox"]').check();

    cy.intercept('PATCH', '**/products/**').as('patchProduct');
    cy.get('button').contains('Update').click();
    cy.wait('@patchProduct');

    cy.intercept('GET', '**/products').as('getProductsAfterEdit');
    cy.visit('http://localhost:3000');
    cy.wait('@getProductsAfterEdit');

    cy.contains('Product List').should('be.visible');
    cy.contains(productName, { timeout: 5000 }).should('be.visible');
  });

  it('should filter available products', () => {
    cy.visit('http://localhost:3000');

    cy.get('input[type="checkbox"]').first().check({ force: true });
    cy.contains(productName).should('be.visible');

    cy.get('input[type="checkbox"]').first().uncheck({ force: true });
    cy.contains(productName).should('exist');
  });

  it('should delete the product', () => {
    cy.visit('http://localhost:3000');

    cy.contains(productName, { timeout: 5000 }).should('be.visible')
      .parent('tr')
      .within(() => {
        cy.contains('Delete').click();
      });

    cy.intercept('DELETE', '**/products/**').as('deleteProduct');
    cy.wait('@deleteProduct');

    cy.intercept('GET', '**/products').as('getProductsAfterDelete');
    cy.visit('http://localhost:3000');
    cy.wait('@getProductsAfterDelete');

    cy.contains(updatedName).should('not.exist');
  });
});
