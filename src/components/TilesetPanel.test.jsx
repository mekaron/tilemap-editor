import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import TilesetPanel from './TilesetPanel';
import EditorContext from '../context/EditorContext';

beforeAll(() => {
  class FileReaderMock {
    readAsDataURL(file) {
      this.result = `data:${file.type};base64,${Buffer.from(file.name).toString('base64')}`;
      if (this.onload) {
        this.onload({ target: { result: this.result } });
      }
    }
  }
  global.FileReader = FileReaderMock;
});

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
  const utils = render(<TilesetPanel />, { wrapper: Wrapper });
  return { ...utils, getState: () => currentState };
};

test('adding tileset updates state and UI', async () => {
  const initialState = {
    zoom: 1,
    tileSize: 32,
    activeTool: 0,
    maps: {},
    tileSets: {},
    activeMap: null,
    activeTileset: '',
  };
  const { container, getState } = setup(initialState);
  const input = container.querySelector('#tilesetReadInput');
  const file = new File(['dummy'], 'add.png', { type: 'image/png' });
  fireEvent.change(input, { target: { files: [file] } });
  await waitFor(() => {
    const keys = Object.keys(getState().tileSets);
    expect(keys.length).toBe(1);
    expect(getState().tileSets[keys[0]].name).toBe('add.png');
    expect(getState().activeTileset).toBe(keys[0]);
    const select = container.querySelector('#tilesetDataSel');
    expect(select.options.length).toBe(1);
  });
});

test('replacing tileset updates existing entry', async () => {
  const initialState = {
    zoom: 1,
    tileSize: 32,
    activeTool: 0,
    maps: {},
    tileSets: { '0': { src: 'old', name: 'old.png' } },
    activeMap: null,
    activeTileset: '0',
  };
  const { container, getState } = setup(initialState);
  const input = container.querySelector('#tilesetReplaceInput');
  const file = new File(['new'], 'new.png', { type: 'image/png' });
  fireEvent.change(input, { target: { files: [file] } });
  await waitFor(() => {
    expect(getState().tileSets['0'].name).toBe('new.png');
    expect(getState().tileSets['0'].src).not.toBe('old');
  });
});

test('removing tileset updates state and select options', () => {
  const initialState = {
    zoom: 1,
    tileSize: 32,
    activeTool: 0,
    maps: {},
    tileSets: { '0': { src: 'a', name: 'a' }, '1': { src: 'b', name: 'b' } },
    activeMap: null,
    activeTileset: '0',
  };
  const { container, getState } = setup(initialState);
  const btn = container.querySelector('#removeTilesetBtn');
  fireEvent.click(btn);
  const keys = Object.keys(getState().tileSets);
  expect(keys).toEqual(['1']);
  expect(getState().activeTileset).toBe('1');
  const select = container.querySelector('#tilesetDataSel');
  expect(select.options.length).toBe(1);
});

test('double-clicking canvas renames tile symbol', () => {
  const initialState = {
    zoom: 1,
    tileSize: 32,
    activeTool: 0,
    maps: {},
    tileSets: {
      '0': {
        src: 'a',
        name: 'a',
        tileSize: 32,
        tileData: {
          '0-0': { x: 0, y: 0, tilesetIdx: 0, tileSymbol: 'A' },
        },
      },
    },
    activeMap: null,
    activeTileset: '0',
  };
  const { container, getState } = setup(initialState);
  const canvas = container.querySelector('#tilesetCanvas');
  canvas.getBoundingClientRect = () => ({ left: 0, top: 0, width: 32, height: 32 });
  const promptSpy = jest.spyOn(window, 'prompt').mockReturnValue('B');
  fireEvent.dblClick(canvas, { offsetX: 1, offsetY: 1 });
  expect(promptSpy).toHaveBeenCalled();
  promptSpy.mockRestore();
  return waitFor(() => {
    expect(getState().tileSets['0'].tileData['0-0'].tileSymbol).toBe('B');
  });
});

