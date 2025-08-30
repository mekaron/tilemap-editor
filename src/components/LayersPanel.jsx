import React from 'react';

export default function LayersPanel() {
  return (
    <div className="card_right-column layers">
      <div id="mapSelectContainer" className="tilemaps_selector">
        <select name="mapsData" id="mapsDataSel"></select>
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
      <div className="layers" id="layers"></div>
    </div>
  );
}
