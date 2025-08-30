import React, { useState } from 'react';
import EditorContext from './EditorContext';

const EditorProvider = ({ children }) => {
  const [editorState, setEditorState] = useState({
    zoom: 1,
    tileSize: 32,
    activeTool: 0,
    maps: {},
    tileSets: {},
  });

  return (
    <EditorContext.Provider value={{ editorState, setEditorState }}>
      {children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;
