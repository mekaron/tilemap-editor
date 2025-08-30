# Legacy Feature Re-implementation Checklist

This document outlines the features from `src/tilemap-editor-legacy.js` that need to be re-implemented in the new React application, ordered by implementation dependency.

## 1. Core State & Drawing Logic (The Foundation)

- [ ] **Active Tool State Management**
    - **Legacy Code:** `ACTIVE_TOOL` variable, `setActiveTool()` (line 501).
    - **Implementation Pointer:** The `activeTool` state already exists in `EditorProvider`. In `src/components/ToolButtons.jsx`, create a function that calls `setEditorState` to update the `activeTool` when a tool button is clicked.
    - **Test Implementation:** Write a test to ensure that clicking a tool button in `ToolButtons.jsx` correctly updates the `activeTool` value in the `editorState`.

- [ ] **Zoom Functionality**
    - **Legacy Code:** `zoomIn()` (line 1083), `zoomOut()` (line 1089), and the `wheel` event listener (line 1598).
    - **Implementation Pointer:** In `src/components/UtilityControls.jsx`, add `onClick` handlers to the zoom buttons that update the `zoom` value in the `editorState`. In `MapCanvas.jsx`, add a `useEffect` to attach a `wheel` event listener to the canvas, which will also update the `zoom` state.
    - **Test Implementation:** Test that clicking zoom buttons or dispatching a wheel event updates the `zoom` value in the `editorState`.

- [ ] **Core Drawing Logic**
    - **Legacy Code:** `draw()` function (line 420).
    - **Implementation Pointer:** This is the most critical missing piece. Create a new `useEffect` hook in `MapCanvas.jsx` that depends on `maps`, `activeMap`, `tileSets`, and `zoom`. This hook will get the canvas context and perform the following:
        1.  Clear the canvas.
        2.  Iterate through the layers of the `activeMap`.
        3.  For each visible layer, iterate through its `tiles` object.
        4.  For each tile, use `ctx.drawImage()` to draw the correct tile from the correct tileset onto the map canvas at the correct position and zoom level.
        5.  Handle flipped tiles (`isFlippedX`).
        6.  Draw the grid on top if enabled.
    - **Test Implementation:** Test that the `draw` function calls `ctx.drawImage` the correct number of times based on the number of tiles in visible layers.

- [ ] **Undo/Redo System**
    - **Legacy Code:** `undoStack`, `addToUndoStack()` (line 1015), `undo()` (line 1058), `redo()` (line 1063).
    - **Implementation Pointer:** This should be managed within `src/context/EditorProvider.jsx`. The `editorState` should include an `undoStack` array and an `undoStepPosition` number. Create `undo` and `redo` functions that manipulate this state and provide them through the context. The `addToUndoStack` logic should be called from any function that modifies the map or tileset data.
    - **Test Implementation:** Write a test to verify that calling `undo` and `redo` functions correctly moves through the `undoStack` and updates the application state accordingly.

- [ ] **State Persistence to `localStorage`**
    - **Legacy Code:** `saveStateToLocalStorage()` (line 1612), `loadData()` (line 1332, which checks localStorage).
    - **Implementation Pointer:** In `src/context/EditorProvider.jsx`, use a `useEffect` hook with a dependency on `editorState`. Inside this effect, call `localStorage.setItem()` to save the serialized state. When the provider first mounts, it should attempt to load the state from `localStorage`.
    - **Test Implementation:** Using a mocked `localStorage`, test that state is saved on change and that initial state is loaded from `localStorage` if it exists.

## 2. Core User Interaction (The Main Workflow)

- [ ] **Multi-tile Selection**
    - **Legacy Code:** `tileSelectStart` variable and the `pointermove` listener on `tilesetContainer` (line 1271).
    - **Implementation Pointer:** In `TilesetPanel.jsx`, add `onPointerDown`, `onPointerMove`, and `onPointerUp` event handlers to the tileset canvas. These handlers will need to calculate the selected tiles based on the mouse position and update a `selection` array in the `editorState`.
    - **Test Implementation:** Test that pointer events on the tileset canvas correctly update the `selection` array in the state.

- [ ] **Tile Interaction Logic**
    - **Legacy Code:** `toggleTile()` (line 670) and its helpers (`addTile`, `removeTile`, etc.).
    - **Implementation Pointer:** Add `onPointerDown`, `onPointerMove`, and `onPointerUp` event handlers to the canvas in `MapCanvas.jsx`. The `onPointerDown` and `onPointerMove` (if mouse is down) handlers will:
        1.  Calculate the map coordinates from the mouse event.
        2.  Check the `activeTool` from the `editorState`.
        3.  Based on the tool, call a function (e.g., `addTile`, `removeTile`) that modifies the `tiles` object of the current active layer in the `editorState`.
        4.  Handle different mouse buttons for different actions (e.g., right-click to pick a tile).
    - **Test Implementation:** Test that pointer events on the map canvas with different `activeTool` states result in the correct modifications to the map's `tiles` data.

## 3. Layer & Map Management (`LayersPanel.jsx`)

- [ ] **Layer Management**
    - [ ] **Add Layer**
        - **Legacy Code:** `addLayerBtn` event listener (line 1486), `addLayer()` (line 219).
        - **Implementation Pointer:** In `LayersPanel.jsx`, add an `onClick` handler to the "Add layer" button. This handler should prompt for a layer name and then add a new layer object to the `layers` array of the `activeMap`.
        - **Test Implementation:** Test that clicking the "Add Layer" button adds a new layer object to the active map's `layers` array.
    - [ ] **Delete Layer**
        - **Legacy Code:** `trashLayer()` (line 197).
        - **Implementation Pointer:** Add a delete button to each layer in `LayersPanel.jsx`. The `onClick` handler should call a function that removes the layer from the `layers` array.
        - **Test Implementation:** Test that clicking the delete button on a layer removes it from the `layers` array.
    - [ ] **Rename Layer**
        - **Legacy Code:** `renameLayer()` (line 205).
        - **Implementation Pointer:** Add a rename button or a double-click handler to each layer name in `LayersPanel.jsx`. This should prompt for a new name and update the `name` property of the layer.
        - **Test Implementation:** Test that the rename function updates the `name` of the correct layer.
    - [ ] **Layer Opacity**
        - **Legacy Code:** `layerOpacitySlider` logic in `setLayer()` (line 155).
        - **Implementation Pointer:** Add a slider or input to each layer in `LayersPanel.jsx`. The `onChange` handler should update the `opacity` property of the layer in the `editorState`.
        - **Test Implementation:** Test that changing the opacity control updates the `opacity` property of the correct layer.

- [ ] **Map Management**
    - [ ] **Add Map**
        - **Legacy Code:** `addMapBtn` event listener (line 1490).
        - **Implementation Pointer:** In `LayersPanel.jsx`, add an `onClick` handler to the "Add map" button. This handler should prompt for a map name and then update the `maps` object in the `editorState`.
        - **Test Implementation:** Test that clicking the "Add Map" button adds a new map object to the `maps` state.
    - [ ] **Remove Map**
        - **Legacy Code:** `removeMapBtn` event listener (line 1511).
        - **Implementation Pointer:** In `LayersPanel.jsx`, add an `onClick` handler to the "Remove map" button. This handler should remove the `activeMap` from the `maps` object and set a new `activeMap`.
        - **Test Implementation:** Test that clicking the "Remove Map" button removes the correct map from the `maps` state.
    - [ ] **Duplicate Map**
        - **Legacy Code:** `duplicateMapBtn` event listener (line 1500).
        - **Implementation Pointer:** In `LayersPanel.jsx`, add an `onClick` handler to the "Duplicate map" button. This handler should create a deep copy of the `activeMap`'s data and add it as a new entry in the `maps` object.
        - **Test Implementation:** Test that clicking the "Duplicate Map" button adds a new, deep-copied map to the `maps` state.
    - [ ] **Rename Map**
        - **Legacy Code:** `renameMapBtn` event listener (line 1568).
        - **Implementation Pointer:** In `LayersPanel.jsx`, inside the map settings popup, add an `onClick` handler to the "Rename map" button. This should prompt for a new name and update the `name` property of the `activeMap` in the `editorState`.
        - **Test Implementation:** Test that the rename function correctly updates the `name` property of the specified map.
    - [ ] **Clear Map**
        - **Legacy Code:** `clearCanvasBtn` event listener (line 1565), `clearCanvas()` (line 724).
        - **Implementation Pointer:** In `LayersPanel.jsx`, inside the map settings popup, add an `onClick` handler to the "Clear map" button. This should reset the `layers` array of the `activeMap` to a default state.
        - **Test Implementation:** Test that the clear function resets the `layers` array of the active map.

- [ ] **Map Settings (Popup)**
    - **Legacy Code:** `canvasWidthInp` and `canvasHeightInp` event listeners (lines 1517-1522), `updateMapSize()` (line 981).
    - **Implementation Pointer:** In `LayersPanel.jsx`, add `onChange` handlers to the width and height input fields in the popup. These handlers should call a function that updates the `mapWidth` and `mapHeight` properties of the `activeMap`.
    - **Test Implementation:** Test that changing the width/height inputs updates the corresponding properties in the active map's state.

## 4. Tileset Management (`TilesetPanel.jsx`)

- [ ] **Tileset Management**
    - [ ] **Add/Replace/Remove Tilesets**
        - **Legacy Code:** Event listeners for `replaceTilesetBtn`, `addTilesetBtn`, `removeTilesetBtn` (lines 1418-1465).
        - **Implementation Pointer:** In `TilesetPanel.jsx`, add `onClick` and `onChange` handlers to the corresponding buttons and file inputs. These handlers will need to read the selected file (likely as a base64 string) and update the `tileSets` object in the `editorState`.
        - **Test Implementation:** Test that the functions for adding, replacing, and removing tilesets correctly modify the `tileSets` object in the state.
    - [ ] **Dynamic Tileset Loaders**
        - **Legacy Code:** `apiTileSetLoaders` object and the logic to populate the `tileSetLoadersSel` dropdown (lines 1448-1458).
        - **Implementation Pointer:** This is more complex. We would need to define the loader configurations in a separate file or object. `TilesetPanel.jsx` would then read this configuration and dynamically render the `<option>` elements. The `onChange` handler for the select would update a new `activeLoader` state.
        - **Test Implementation:** Test that the component correctly renders loader options from a configuration object.

- [ ] **Tileset Interaction**
    - [ ] **Rename Tile Symbol**
        - **Legacy Code:** `renameCurrentTileSymbol()` (line 961), called on right-click or double-click.
        - **Implementation Pointer:** Add `onContextMenu` (with `e.preventDefault()`) and `onDoubleClick` handlers to the tileset canvas in `TilesetPanel.jsx`. These handlers will prompt for a new symbol and update the `tileSymbol` property of the selected tile in the `tileSets` state.
        - **Test Implementation:** Test that the rename function correctly updates the `tileSymbol` for the selected tile.
    - [ ] **Display Symbols on Grid**
        - **Legacy Code:** `updateTilesetGridContainer()` (line 540), which draws the symbols.
        - **Implementation Pointer:** In the `useEffect` hook in `TilesetPanel.jsx` that draws the tileset image, add logic to iterate over the tiles and draw the `tileSymbol` on top of each tile on the canvas. This should be controlled by a new `displaySymbols` boolean in the `editorState`.
        - **Test Implementation:** Using canvas mocking or snapshot testing, verify that symbols are rendered when `displaySymbols` is true.

- [ ] **Tile Metadata & Objects**
    - **Legacy Code:** The entire system for `frames` and `tags`, including functions like `updateTilesetDataList()` (line 1121), `getCurrentFrames()` (line 631), and numerous event listeners for the object and animation buttons (lines 1300-1416).
    - **Implementation Pointer:** This is a major feature. It will require significant state management within the `tileSets` object for `frames` and `tags`. The UI in `TilesetPanel.jsx` needs to be connected to this state with `onClick` and `onChange` handlers for all the buttons and inputs.
    - **Test Implementation:** Test that adding a new "frame" or "tag" correctly updates the `tileSets` data structure.

## 5. Top Navigation Bar & File Menu

- [ ] **Tool Selection**
    - **Legacy Code:** `handleToolSelect` (line 1467).
    - **Implementation Pointer:** Already covered in Global State. In `ToolButtons.jsx`, add an `onClick` handler to each tool button that updates the `activeTool` in the `editorState`.
    - **Test Implementation:** (Covered by "Active Tool State Management" test).

- [ ] **File Menu (Import/Export)**
    - **Legacy Code:** `makeMenuItem` and the logic for exporters and importers (lines 1538-1580).
    - **Implementation Pointer:** This will require creating a new `FileMenu` component. This component will render the menu and its items. The `onClick` handlers for the export options will call functions that serialize the current state (e.g., `JSON.stringify({ maps, tileSets })`) and trigger a download. The import handlers will open a file dialog and parse the selected file to update the state.
    - **Test Implementation:** Test that the export function correctly serializes the application state. Test that the import function correctly parses a file and updates the state.