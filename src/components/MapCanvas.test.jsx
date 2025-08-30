import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MapCanvas from './MapCanvas';
import EditorContext from '../context/EditorContext';

const setup = (initialState) => {
  let currentState = initialState;
  const Wrapper = ({ children }) => {
    const [state, setState] = React.useState(initialState);
    currentState = state;
    return (
      <EditorContext.Provider value={{ editorState: state, setEditorState: setState }}>
        {children}
      </EditorContext.Provider>
    );
  };
  const utils = render(<MapCanvas />, { wrapper: Wrapper });
  const canvas = utils.container.querySelector('#mapCanvas');
  canvas.getBoundingClientRect = () => ({
    left: 0,
    top: 0,
    right: canvas.width,
    bottom: canvas.height,
    width: canvas.width,
    height: canvas.height,
  });
  return { ...utils, canvas, getState: () => currentState };
};

beforeAll(() => {
  if (!window.PointerEvent) {
    class PointerEvent extends Event {
      constructor(type, props = {}) {
        super(type, props);
        this.clientX = props.clientX || 0;
        this.clientY = props.clientY || 0;
      }
    }
    window.PointerEvent = PointerEvent;
  }
});

test('MapCanvas uses width and height props', () => {
  const initialState = {
    zoom: 1,
    tileSize: 32,
    activeTool: 0,
    maps: {
      Map_1: {
        layers: [],
        name: 'Map 1',
        mapWidth: 10,
        mapHeight: 10,
        tileSize: 32,
        width: 320,
        height: 320,
        gridColor: '#00FFFF',
      },
    },
    activeMap: 'Map_1',
    activeLayer: 0,
    tileSets: {},
  };
  const { canvas } = setup(initialState);
  expect(canvas.getAttribute('width')).toBe('320');
  expect(canvas.getAttribute('height')).toBe('320');
});

test('pointer events add tiles when using add tool', async () => {
  const initialState = {
    zoom: 1,
    tileSize: 32,
    activeTool: 0,
    maps: {
      Map_1: {
        layers: [{ tiles: {}, visible: true, locked: false }],
        name: 'Map 1',
        mapWidth: 2,
        mapHeight: 2,
        tileSize: 32,
        width: 64,
        height: 64,
        gridColor: '#00FFFF',
      },
    },
    activeMap: 'Map_1',
    activeLayer: 0,
    tileSets: {},
  };
  const { canvas, getState } = setup(initialState);
  fireEvent.pointerDown(canvas, { clientX: 16, clientY: 16 });
  fireEvent.pointerMove(canvas, { clientX: 48, clientY: 16 });
  fireEvent.pointerUp(canvas);
  await waitFor(() => {
    const tiles = getState().maps.Map_1.layers[0].tiles;
    expect(tiles['0-0']).toBeDefined();
    expect(tiles['1-0']).toBeDefined();
  });
});

test('pointer events remove tiles when using erase tool', async () => {
  const initialState = {
    zoom: 1,
    tileSize: 32,
    activeTool: 1,
    maps: {
      Map_1: {
        layers: [{ tiles: { '0-0': { x: 0, y: 0, tilesetIdx: 0 } }, visible: true, locked: false }],
        name: 'Map 1',
        mapWidth: 2,
        mapHeight: 2,
        tileSize: 32,
        width: 64,
        height: 64,
        gridColor: '#00FFFF',
      },
    },
    activeMap: 'Map_1',
    activeLayer: 0,
    tileSets: {},
  };
  const { canvas, getState } = setup(initialState);
  fireEvent.pointerDown(canvas, { clientX: 16, clientY: 16 });
  fireEvent.pointerUp(canvas);
  await waitFor(() => {
    const tiles = getState().maps.Map_1.layers[0].tiles;
    expect(tiles['0-0']).toBeUndefined();
  });
});

test('pointer events do not modify tiles when using pick tool', async () => {
  const initialState = {
    zoom: 1,
    tileSize: 32,
    activeTool: 3,
    maps: {
      Map_1: {
        layers: [{ tiles: { '0-0': { x: 0, y: 0, tilesetIdx: 0 } }, visible: true, locked: false }],
        name: 'Map 1',
        mapWidth: 2,
        mapHeight: 2,
        tileSize: 32,
        width: 64,
        height: 64,
        gridColor: '#00FFFF',
      },
    },
    activeMap: 'Map_1',
    activeLayer: 0,
    tileSets: {},
  };
  const { canvas, getState } = setup(initialState);
  fireEvent.pointerDown(canvas, { clientX: 16, clientY: 16 });
  fireEvent.pointerUp(canvas);
  await waitFor(() => {
    const tiles = getState().maps.Map_1.layers[0].tiles;
    expect(tiles['0-0']).toBeDefined();
  });
});

