import React, { useContext } from 'react';
import EditorContext from '../context/EditorContext';

export default function UtilityControls() {
  const { editorState, setEditorState } = useContext(EditorContext);
  const { zoom } = editorState;

  const handleZoomIn = () => {
    setEditorState({ ...editorState, zoom: zoom * 2 });
  };

  const handleZoomOut = () => {
    setEditorState({ ...editorState, zoom: zoom / 2 });
  };

  return (
    <div className="tool_wrapper">
      <label id="undoBtn" title="Undo">↩️️</label>
      <label id="redoBtn" title="Redo">🔁️</label>
      <label id="zoomIn" title="Zoom in" onClick={handleZoomIn}>🔎️+</label>
      <label id="zoomOut" title="Zoom out" onClick={handleZoomOut}>🔎️-</label>
      <label id="zoomLabel">{zoom}x️</label>
    </div>
  );
}
