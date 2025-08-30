import { editorReducer, initialState, TOOLS } from './EditorContext';

describe('editorReducer', () => {
  it('sets the active tool and preserves previous tool', () => {
    const state = { ...initialState, activeTool: TOOLS.BRUSH };
    const result = editorReducer(state, { type: 'SET_TOOL', tool: TOOLS.ERASE });
    expect(result.activeTool).toBe(TOOLS.ERASE);
    expect(result.prevActiveTool).toBe(TOOLS.BRUSH);
  });

  it('adds a new map and sets it active', () => {
    const map = { name: 'map1', layers: [] };
    const result = editorReducer(initialState, { type: 'ADD_MAP', map });
    expect(result.maps.map1).toEqual(map);
    expect(result.activeMap).toBe('map1');
  });

  it('updates an existing layer in a map', () => {
    const baseState = {
      ...initialState,
      maps: { map1: { name: 'map1', layers: [{ name: 'layer1', visible: true }] } },
      activeMap: 'map1',
    };
    const result = editorReducer(baseState, {
      type: 'UPDATE_LAYER',
      mapName: 'map1',
      layerIndex: 0,
      layerData: { visible: false },
    });
    expect(result.maps.map1.layers[0].visible).toBe(false);
  });
});
