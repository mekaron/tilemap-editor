import React, { createContext, useReducer, useContext } from 'react';

export const TOOLS = {
  BRUSH: 0,
  ERASE: 1,
  PAN: 2,
  PICK: 3,
  RAND: 4,
  FILL: 5,
};

export const initialState = {
  prevActiveTool: TOOLS.BRUSH,
  activeTool: TOOLS.BRUSH,
  activeMap: '',
  displaySymbols: false,
  showGrid: false,
  selection: [],
  currentLayer: 0,
  isMouseDown: false,
  maps: {},
  tileSets: {},
  activeLoader: 'default',
};

export const editorReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TOOL':
      return {
        ...state,
        prevActiveTool: state.activeTool,
        activeTool: action.tool,
      };
    case 'ADD_MAP':
      return {
        ...state,
        maps: { ...state.maps, [action.map.name]: action.map },
        activeMap: action.map.name,
      };
    case 'UPDATE_LAYER': {
      const { mapName, layerIndex, layerData } = action;
      const map = state.maps[mapName];
      if (!map) return state;
      const layers = map.layers.map((l, i) =>
        i === layerIndex ? { ...l, ...layerData } : l
      );
      return {
        ...state,
        maps: { ...state.maps, [mapName]: { ...map, layers } },
      };
    }
    case 'SET_ACTIVE_MAP':
      return { ...state, activeMap: action.name };
    case 'TOGGLE_GRID':
      return { ...state, showGrid: !state.showGrid };
    default:
      return state;
  }
};

const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(editorReducer, initialState);
  return (
    <EditorContext.Provider value={{ state, dispatch, TOOLS }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => useContext(EditorContext);

export default EditorContext;
