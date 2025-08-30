import React from 'react';

export default function UtilityControls() {
  return (
    <div className="tool_wrapper">
      <label id="undoBtn" title="Undo">↩️️</label>
      <label id="redoBtn" title="Redo">🔁️</label>
      <label id="zoomIn" title="Zoom in">🔎️+</label>
      <label id="zoomOut" title="Zoom out">🔎️-</label>
      <label id="zoomLabel">️</label>
    </div>
  );
}
