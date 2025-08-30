import React from 'react';
import { render, screen, fireEvent } from '../utils/test-utils';
import LayersPanel from './LayersPanel';
import EditorContext from '../context/EditorContext';

const mockEditorState = {
  maps: {},
  activeMap: null,
  activeLayer: 0,
  tileSize: 32,
};

const setEditorState = jest.fn();

const renderComponent = () =>
  render(
    <EditorContext.Provider value={{ editorState: mockEditorState, setEditorState }}>
      <LayersPanel />
    </EditorContext.Provider>
  );

test('adds new map to state', () => {
  window.prompt = jest.fn().mockReturnValue('Test Map');
  renderComponent();
  const addButton = screen.getByTitle('Add tilemap');
  fireEvent.click(addButton);
  expect(setEditorState).toHaveBeenCalledWith({
    ...mockEditorState,
    maps: {
      ...mockEditorState.maps,
      Test_Map: {
        name: 'Test Map',
        layers: [],
        mapWidth: 0,
        mapHeight: 0,
        tileSize: mockEditorState.tileSize,
        width: 0,
        height: 0,
        gridColor: '#00FFFF',
      },
    },
    activeMap: 'Test_Map',
  });
});
