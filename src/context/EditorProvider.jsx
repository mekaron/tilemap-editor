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
    activeMap: null,
    activeTileset: null,
  });

  useEffect(() => {
    const maps = initialData.maps || {};
    const tileSets = initialData.tileSets || {};
    const activeMap = Object.keys(maps)[0] || null;
    const activeTileset = Object.keys(tileSets)[0] || null;

    setEditorState((prevState) => ({
      ...prevState,
      maps,
      tileSets,
      activeMap,
      activeTileset,
    }));
  }, []);

  return (
    <EditorContext.Provider value={{ editorState, setEditorState }}>
      {children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;
