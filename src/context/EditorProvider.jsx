import React, { useState, useEffect } from 'react';
import EditorContext from './EditorContext';
import initialData from '../../ioJsonData.json';

const EditorProvider = ({ children }) => {
  const [editorState, setEditorState] = useState({
    zoom: 1,
    tileSize: 32,
    activeTool: 0,
    maps: {},
    tileSets: {},
  });

  useEffect(() => {
    setEditorState((prevState) => ({
      ...prevState,
      ...initialData,
    }));
  }, []);

  return (
    <EditorContext.Provider value={{ editorState, setEditorState }}>
      {children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;
