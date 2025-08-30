import React from 'react';

export default function TilesetPanel() {
  return (
    <div className="card_left_column">
      <details className="details_container sticky_left" id="tilesetDataDetails" open>
        <summary>
          <span id="mapSelectContainer">
            |{' '}
            <select name="tileSetSelectData" id="tilesetDataSel" className="limited_select"></select>
            <button id="replaceTilesetBtn" title="replace tileset">r</button>
            <input id="tilesetReplaceInput" type="file" style={{ display: 'none' }} />
            <button id="addTilesetBtn" title="add tileset">+</button>
            <input id="tilesetReadInput" type="file" style={{ display: 'none' }} />
            <button id="removeTilesetBtn" title="remove">-</button>
          </span>
        </summary>
        <div>
          <div className="tileset_opt_field">
            <span>Tile size:</span>
            <input type="number" id="cropSize" name="crop" placeholder="32" min="1" max="128" />
          </div>
          <div className="tileset_opt_field">
            <span>Tileset loader:</span>
            <select name="tileSetLoaders" id="tileSetLoadersSel"></select>
          </div>
          <div className="tileset_info" id="tilesetSrcLabel"></div>
          <div className="tileset_info" id="tilesetHomeLink"></div>
          <div className="tileset_info" id="tilesetDescriptionLabel"></div>
        </div>
      </details>
      <div className="select_container layer sticky_top sticky_left" id="tilesetSelectContainer">
        <span id="setSymbolsVisBtn">👓️</span>
        <select name="tileData" id="tileDataSel">
          <option value="">Symbols</option>
        </select>
        <button id="addTileTagBtn" title="add">+</button>
        <button id="removeTileTagBtn" title="remove">-</button>
      </div>
      <div
        className="select_container sticky_top2 sticky_settings sticky_left"
        style={{ display: 'none', flexDirection: 'column' }}
        id="tileFrameSelContainer"
      >
        <div className="item nohover layer tileset_opt_field">
          <div title="Object parameters" className="menu parameters" id="objectParametersEditor">
            ⚙
            <div className="dropdown">
              <div className="item">
                💡 object:
                <button id="renameTileFrameBtn" title="rename object">
                  📝
                </button>
                <button id="removeTileFrameBtn" title="remove">
                  🗑️
                </button>
                <button id="addTileFrameBtn" title="add new object">+ new</button>
              </div>
            </div>
            ️
          </div>
          <select name="tileFrameData" id="tileFrameSel" style={{ maxWidth: '150px' }}></select>
          frames: <input id="tileFrameCount" defaultValue="1" type="number" min="1" />
        </div>
        <div className="item nohover layer tileset_opt_field">
          <div title="Animation parameters" className="menu parameters" id="objectParametersEditor">
            ⚙
            <div className="dropdown">
              <div className="item">
                🎞️ animation:
                <button id="renameTileAnimBtn" title="rename animation">
                  📝
                </button>
                <button id="removeTileAnimBtn" title="remove">
                  🗑️
                </button>
                <button id="addTileAnimBtn" title="add new animation">+ new</button>
              </div>
            </div>
            ️
          </div>
          <select name="tileAnimData" id="tileAnimSel" style={{ maxWidth: '72px' }}></select>
          <input
            id="animStart"
            defaultValue="1"
            type="number"
            min="1"
            title="animation start"
            className="two-digit-width"
          />{' '}
          to
          <input
            id="animEnd"
            defaultValue="1"
            type="number"
            min="1"
            title="animation end"
            className="two-digit-width"
          />
          <span title="animation speed">⏱</span>
          <input
            id="animSpeed"
            defaultValue="1"
            type="number"
            min="1"
            title="animation speed"
            className="two-digit-width"
          />
          <span className="item" title="loop animation">
            <input type="checkbox" id="animLoop" style={{ display: 'none' }} defaultChecked />
            <label htmlFor="animLoop" className="animLoop">
              ️
            </label>
          </span>
        </div>
      </div>
      <div className="tileset-container">
        <div className="tileset-container-selection"></div>
        <canvas id="tilesetCanvas"></canvas>
      </div>
    </div>
  );
}
