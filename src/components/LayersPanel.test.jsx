import React from 'react';
import { render, screen, fireEvent } from '../utils/test-utils';
import LayersPanel from './LayersPanel';
import EditorContext from '../context/EditorContext';

test('deleting a layer removes the correct layer', () => {
  const mockEditorState = {
    maps: {
      Map_1: {
        layers: [
          { name: 'Layer 1', visible: true, locked: false, opacity: 1 },
          { name: 'Layer 2', visible: true, locked: false, opacity: 1 },
        ],
      },
    },
    activeMap: 'Map_1',
    activeLayer: 0,
  };
  const setEditorState = jest.fn();
  global.confirm = jest.fn(() => true);

  render(
    <EditorContext.Provider value={{ editorState: mockEditorState, setEditorState }}>
      <LayersPanel />
    </EditorContext.Provider>
  );

  const deleteButtons = screen.getAllByTitle('Delete layer');
  fireEvent.click(deleteButtons[1]);

  expect(setEditorState).toHaveBeenCalledWith({
    ...mockEditorState,
    maps: {
      Map_1: {
        layers: [
          { name: 'Layer 1', visible: true, locked: false, opacity: 1 },
        ],
      },
    },
    activeLayer: 0,
  });
});
