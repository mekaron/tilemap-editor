import React from 'react';
import { render, screen, fireEvent } from '../utils/test-utils';
import UtilityControls from './UtilityControls';
import EditorContext from '../context/EditorContext';

const mockEditorState = {
  zoom: 1,
};

const setEditorState = jest.fn();

const renderComponent = () =>
  render(
    <EditorContext.Provider value={{ editorState: mockEditorState, setEditorState }}>
      <UtilityControls />
    </EditorContext.Provider>
  );

test('UtilityControls renders correctly', () => {
  const { container } = renderComponent();
  expect(screen.getByTitle('Zoom in')).toBeTruthy();
  expect(container.querySelector('.tool_wrapper')).toMatchSnapshot();
});

test('UtilityControls changes zoom on click', () => {
  renderComponent();
  const zoomInButton = screen.getByTitle('Zoom in');
  fireEvent.click(zoomInButton);
  expect(setEditorState).toHaveBeenCalledWith({
    ...mockEditorState,
    zoom: 2,
  });

  const zoomOutButton = screen.getByTitle('Zoom out');
  fireEvent.click(zoomOutButton);
  expect(setEditorState).toHaveBeenCalledWith({
    ...mockEditorState,
    zoom: 0.5,
  });
});
