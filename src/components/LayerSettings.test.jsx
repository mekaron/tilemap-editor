import React from 'react';
import { render, screen, fireEvent } from '../utils/test-utils';
import LayerSettings from './LayerSettings';
import EditorContext from '../context/EditorContext';

const mockEditorState = {
  maps: {
    'Map_1': {
      layers: [
        {
          name: 'Layer 1',
          opacity: 0.5,
        },
      ],
    },
  },
  activeMap: 'Map_1',
  activeLayer: 0,
};

const setEditorState = jest.fn();

const renderComponent = () =>
  render(
    <EditorContext.Provider value={{ editorState: mockEditorState, setEditorState }}>
      <LayerSettings />
    </EditorContext.Provider>
  );

test('layer opacity reflects props', () => {
  renderComponent();
  expect(screen.getByLabelText(/Opacity/i).value).toBe('0.5');
  expect(screen.getByText('0.5')).toBeTruthy();
});

test('opacity slider triggers callback', () => {
  renderComponent();
  const slider = screen.getByLabelText(/Opacity/i);
  fireEvent.change(slider, { target: { value: '0.7' } });
  expect(setEditorState).toHaveBeenCalledWith({
    ...mockEditorState,
    maps: {
      'Map_1': {
        layers: [
          {
            name: 'Layer 1',
            opacity: 0.7,
          },
        ],
      },
    },
  });
});
