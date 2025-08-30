import React from 'react';
import { render, screen, fireEvent } from '../utils/test-utils';
import ToolButtons from './ToolButtons';
import EditorContext from '../context/EditorContext';

const mockEditorState = {
  activeTool: 0,
};

const setEditorState = jest.fn();

const renderComponent = () =>
  render(
    <EditorContext.Provider value={{ editorState: mockEditorState, setEditorState }}>
      <ToolButtons />
    </EditorContext.Provider>
  );

test('ToolButtons renders correctly', () => {
  const { container } = renderComponent();
  expect(screen.getByTitle('paint tiles')).toBeTruthy();
  expect(container.querySelector('#toolButtonsWrapper')).toMatchSnapshot();
});

test('ToolButtons changes active tool on click', () => {
  renderComponent();
  const eraseButton = screen.getByTitle('erase tiles');
  fireEvent.click(eraseButton);
  expect(setEditorState).toHaveBeenCalledWith({
    ...mockEditorState,
    activeTool: 1,
  });
});
