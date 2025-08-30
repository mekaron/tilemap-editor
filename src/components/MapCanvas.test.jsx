import React from 'react';
import { render } from '../utils/test-utils';
import MapCanvas from './MapCanvas';
import EditorContext from '../context/EditorContext';

const mockEditorState = {
  zoom: 1,
  tileSize: 32,
  activeTool: 0,
  maps: {
    'Map_1': {
      layers: [],
      name: 'Map 1',
      mapWidth: 10,
      mapHeight: 10,
      tileSize: 32,
      width: 320,
      height: 320,
      gridColor: '#00FFFF',
    },
  },
  activeMap: 'Map_1',
  tileSets: {},
};

const renderComponent = () =>
  render(
    <EditorContext.Provider value={{ editorState: mockEditorState }}>
      <MapCanvas />
    </EditorContext.Provider>
  );

test('MapCanvas uses width and height props', () => {
  const { container } = renderComponent();
  let canvas = container.querySelector('#mapCanvas');
  expect(canvas.getAttribute('width')).toBe('320');
  expect(canvas.getAttribute('height')).toBe('320');
});
