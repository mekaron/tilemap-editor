import React from 'react';
import NavigationBar from './components/NavigationBar';
import ToolButtons from './components/ToolButtons';
import UtilityControls from './components/UtilityControls';

export default function App() {
  return (
    <div id="tilemapjs_root" className="card tilemapjs_root">
      <a id="downloadAnchorElem" style={{ display: 'none' }}></a>
      <div className="nav_wrapper">
        <NavigationBar />
        <ToolButtons />
        <UtilityControls />
        <div>
          <button className="primary-button" id="confirmBtn">"apply"</button>
        </div>
      </div>
      <div id="layoutContainer" className="card_body"></div>
    </div>
  );
}
