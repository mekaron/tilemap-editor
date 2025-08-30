import React, { useRef, useContext } from 'react';
import useDraggable from '../hooks/useDraggable';
import useGridCanvas from '../hooks/useGridCanvas';
import EditorContext from '../context/EditorContext';

export default function MapCanvas() {
  const { editorState, setEditorState } = useContext(EditorContext);
  const { zoom, tileSize, maps, activeMap, activeLayer = 0, activeTool } = editorState;
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const isPointerDown = useRef(false);

  const map = maps[activeMap];
  const width = map ? map.width * zoom : 0;
  const height = map ? map.height * zoom : 0;

  useDraggable({ element: wrapperRef, onElement: canvasRef });
  useGridCanvas(canvasRef, width, height, tileSize * zoom, map ? map.gridColor : '#00FFFF');

  const screenToMap = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / (tileSize * zoom));
    const y = Math.floor((event.clientY - rect.top) / (tileSize * zoom));
    return { x, y };
  };

  const applyTool = ({ x, y }) => {
    if (!map) return;
    const key = `${x}-${y}`;
    const layer = map.layers[activeLayer];
    if (!layer) return;
    const tiles = { ...layer.tiles };

    if (activeTool === 0) {
      tiles[key] = { x: 0, y: 0, tilesetIdx: 0 };
    } else if (activeTool === 1) {
      delete tiles[key];
    } else if (activeTool === 3) {
      return;
    }

    const newLayers = map.layers.map((l, i) =>
      i === activeLayer ? { ...l, tiles } : l
    );
    setEditorState({
      ...editorState,
      maps: {
        ...maps,
        [activeMap]: { ...map, layers: newLayers },
      },
    });
  };

  const handlePointerDown = (e) => {
    isPointerDown.current = true;
    applyTool(screenToMap(e));
  };

  const handlePointerMove = (e) => {
    if (!isPointerDown.current) return;
    applyTool(screenToMap(e));
  };

  const handlePointerUp = () => {
    isPointerDown.current = false;
  };

  return (
    <div className="card_right-column" style={{ position: 'relative' }} id="canvas_drag_area">
      <div className="canvas_wrapper" id="canvas_wrapper" ref={wrapperRef} style={{ position: 'absolute' }}>
        <canvas
          id="mapCanvas"
          ref={canvasRef}
          width={width}
          height={height}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        ></canvas>
      </div>
    </div>
  );
}
