import React from 'react';
import { render, screen, fireEvent } from '../utils/test-utils';
import LayersPanel from './LayersPanel';
import EditorContext from '../context/EditorContext';

const mockEditorState = {
  maps: {
    testMap: {
      name: 'Test Map',
      layers: [
        { tiles: {}, visible: true, name: 'Layer1', opacity: 1, locked: false },
      ],
    },
  },
  activeMap: 'testMap',
  activeLayer: 0,
};

const setEditorState = jest.fn();

test('clicking Add layer adds a new layer to active map', () => {
  const promptSpy = jest
    .spyOn(window, 'prompt')
    .mockReturnValue('New Layer');

  render(
    <EditorContext.Provider value={{ editorState: mockEditorState, setEditorState }}>
      <LayersPanel />
    </EditorContext.Provider>
  );

  fireEvent.click(screen.getByTitle('Add layer'));

  expect(setEditorState).toHaveBeenCalledWith({
    ...mockEditorState,
    maps: {
      ...mockEditorState.maps,
      testMap: {
        ...mockEditorState.maps.testMap,
        layers: [
          ...mockEditorState.maps.testMap.layers,
          {
            tiles: {},
            visible: true,
            name: 'New Layer',
            opacity: 1,
            locked: false,
          },
        ],
      },
    },
  });

  promptSpy.mockRestore();
});
