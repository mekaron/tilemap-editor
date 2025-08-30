describe('Tilemap editor key flows', () => {
  beforeEach(() => {
    cy.visit('index.html');
  });

  it('places a tile on the map', () => {
    cy.get('#tilesetCanvas').click(5, 5);
    cy.window().then((win) => {
      delete win.TilemapEditor.getLayers()[0].tiles['0-0'];
    });
    cy.get('#mapCanvas').click(5, 5);
    cy.window().then((win) => {
      expect(win.TilemapEditor.getLayers()[0].tiles).to.have.property('0-0');
    });
  });

  it('toggles layer visibility', () => {
    cy.get('#setLayerVisBtn-0').click();
    cy.window().then((win) => {
      expect(win.TilemapEditor.getLayers()[0].visible).to.be.false;
    });
  });

  it('exports map data through the file menu', () => {
    cy.window().then((win) => {
      cy.spy(win.TilemapEditor.exporters.saveData, 'transformer').as('exportSpy');
    });
    cy.contains('File').trigger('mouseover');
    cy.contains('Download Json file').click();
    cy.get('@exportSpy').should('have.been.called');
  });
});
