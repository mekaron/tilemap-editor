import React, { useContext, useRef, useEffect } from 'react';
import EditorContext from '../context/EditorContext';
import useDraggable from '../hooks/useDraggable';

export default function LayersPanel() {
  const { editorState, setEditorState } = useContext(EditorContext);
  const { maps, activeMap } = editorState;
  const activeMapData = maps[activeMap];
  const layers = activeMapData ? activeMapData.layers : [];
  const handleRef = useRef(null);
  const { isDragging, draggedItem, dropTarget } = useDraggable(handleRef);

  useEffect(() => {
    if (!isDragging && draggedItem && dropTarget) {
      const fromIndex = Number(draggedItem.dataset.layerIndex);
      const toIndex = Number(dropTarget.dataset.layerIndex);
      if (fromIndex !== toIndex) {
        const newLayers = [...layers];
        [newLayers[fromIndex], newLayers[toIndex]] = [newLayers[toIndex], newLayers[fromIndex]];
        setEditorState({
          ...editorState,
          maps: {
            ...maps,
            [activeMap]: {
              ...activeMapData,
              layers: newLayers,
            },
          },
        });
      }
    }
  }, [isDragging, draggedItem, dropTarget]);

  const handleMapChange = (e) => {
    setEditorState({ ...editorState, activeMap: e.target.value });
  };

  const setLayerIsVisible = (layerIndex) => {
    const newLayers = [...layers];
    newLayers[layerIndex].visible = !newLayers[layerIndex].visible;
    setEditorState({
      ...editorState,
      maps: {
        ...maps,
        [activeMap]: {
          ...activeMapData,
          layers: newLayers,
        },
      },
    });
  };

  const setLayerIsLocked = (layerIndex) => {
    const newLayers = [...layers];
    newLayers[layerIndex].locked = !newLayers[layerIndex].locked;
    setEditorState({
      ...editorState,
      maps: {
        ...maps,
        [activeMap]: {
          ...activeMapData,
          layers: newLayers,
        },
      },
    });
  };

  const setLayer = (layerIndex) => {
    setEditorState({ ...editorState, activeLayer: layerIndex });
  };

  return (
    <div className="card_right-column layers">
      <div id="mapSelectContainer" className="tilemaps_selector">
        <select name="mapsData" id="mapsDataSel" value={activeMap} onChange={handleMapChange}>
          {Object.keys(maps).map((map) => (
            <option key={map} value={map}>
              {maps[map].name}
            </option>
          ))}
        </select>
        <button id="addMapBtn" title="Add tilemap">+</button>
        <button id="removeMapBtn" title="Remove tilemap">-</button>
        <button id="duplicateMapBtn" title="Duplicate tilemap">📑</button>
        <a className="button" href="#popup1">🎚️</a>
        <div id="popup1" className="overlay">
          <div className="popup">
            <h4>TileMap settings</h4>
            <a className="close" href="#">&times;</a>
            <div className="content">
              <span className="flex">Width: </span>
              <input id="canvasWidthInp" defaultValue="1" type="number" min="1" />
              <span className="flex">Height: </span>
              <input id="canvasHeightInp" defaultValue="1" type="number" min="1" />
              <br />
              <br />
              <span className="flex">Grid tile size: </span>
              <input
                type="number"
                id="gridCropSize"
                name="crop"
                placeholder="32"
                min="1"
                max="128"
              />
              <span className="flex">Grid color: </span>
              <input type="color" defaultValue="#ff0000" id="gridColorSel" />
              <span className="flex">Show grid above: </span>{' '}
              <input type="checkbox" id="showGrid" />
              <br />
              <br />
              <div className="tileset_opt_field">
                <button id="renameMapBtn" title="Rename map">Rename</button>
                <button id="clearCanvasBtn" title="Clear map">Clear</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <label className="sticky add_layer">
        <label id="activeLayerLabel" className="menu">
          Editing Layer
        </label>
        <button id="addLayerBtn" title="Add layer">+</button>
      </label>
      <div className="layers" id="layers">
        {layers.map((layer, index) => (
          <div key={index} className={`layer ${editorState.activeLayer === index ? 'active' : ''}`} data-layer-index={index}>
            <div className="layer-handle" ref={handleRef}>☰</div>
            <div className="layer select_layer" onClick={() => setLayer(index)} title={layer.name}>
              {layer.name} {layer.opacity < 1 ? ` (${layer.opacity})` : ''}
            </div>
            <span onClick={() => setLayerIsVisible(index)}>{layer.visible ? '👁️' : '👓'}</span>
            <span onClick={() => setLayerIsLocked(index)}>{layer.locked ? '🔒' : '🔓'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
