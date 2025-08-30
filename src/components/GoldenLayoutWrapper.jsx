import React, { useEffect, useRef } from 'react';
import { GoldenLayout } from 'golden-layout';
import TilesetPanel from './TilesetPanel';
import MapCanvas from './MapCanvas';
import LayersPanel from './LayersPanel';
import LayerSettings from './LayerSettings';
import NavigationBar from './NavigationBar';
import ToolButtons from './ToolButtons';
import UtilityControls from './UtilityControls';

export default function GoldenLayoutWrapper() {
  const containerRef = useRef(null);
  const layoutRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const layout = new GoldenLayout(containerRef.current);
    layoutRef.current = layout;

    layout.registerComponent('Tileset', TilesetPanel);
    layout.registerComponent('Map', MapCanvas);
    layout.registerComponent('Layers', LayersPanel);
    layout.registerComponent('Layer Settings', LayerSettings);

    layout.loadLayout({
      root: {
        type: 'row',
        content: [
          { type: 'component', componentName: 'Tileset' },
          { type: 'component', componentName: 'Map' },
          {
            type: 'column',
            content: [
              { type: 'component', componentName: 'Layers' },
              { type: 'component', componentName: 'Layer Settings' },
            ],
          },
        ],
      },
    });

    return () => {
      try {
        layout.destroy();
      } catch (e) {
        // ignore
      }
    };
  }, []);

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
      <div ref={containerRef} className="card_body" style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
