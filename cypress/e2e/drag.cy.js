describe('drag operation', () => {
  it('moves element when dragged', () => {
    cy.visit('drag.html');
    cy.get('#handle').trigger('pointerdown', { clientX: 10, clientY: 10 });
    cy.document().trigger('pointermove', { clientX: 30, clientY: 40 });
    cy.document().trigger('pointerup');
    cy.get('#canvas_wrapper')
      .should('have.attr', 'style')
      .and('include', 'left: 20px')
      .and('include', 'top: 30px');
  });
});
