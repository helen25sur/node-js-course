describe('Navigation between pages', () => {
  it('should navigate to Home like Products list', () => {
    cy.visit('http://localhost:3001/products');
    cy.contains('Products List');
  });

  it('should navigate from Home to Top3 and back', () => {
    cy.visit('http://localhost:3001/products');
    cy.contains('Products List');

    cy.get('a[href="/products/top-3"]').click();
    cy.url().should('include', '/products/top-3');
    cy.contains('Top 3 Products');

    cy.go('back');
    cy.url().should('include', 'http://localhost:3001/products');
  });

  it('should navigate from Home to Categories and back', () => {
    cy.visit('http://localhost:3001/products');
    cy.contains('Products List');

    cy.get('a[href="/categories"]').click();
    cy.url().should('include', '/categories');
    cy.contains('Smartphones');

    cy.go('back');
    cy.url().should('include', 'http://localhost:3001/products');
  });

  it('should navigate from Categories to detail page of category (Smartphones) and back', () => {
    cy.visit('http://localhost:3001/categories');
    cy.contains('Smartphones');

    cy.get('a[href="/categories/Smartphones"]').click();
    cy.url().should('include', '/Smartphones');
    cy.contains('Category: Smartphones');

    cy.go('back');
    cy.url().should('include', 'http://localhost:3001/categories');
  });

  it('should navigate from Home to Orders and back', () => {
    cy.visit('http://localhost:3001/products');
    cy.contains('Products List');

    cy.get('a[href="/orders"]').click();
    cy.url().should('include', '/orders');
    cy.contains('Orders List');

    cy.go('back');
    cy.url().should('include', 'http://localhost:3001/products');
  });

});