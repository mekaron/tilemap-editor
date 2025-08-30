import React, { useRef, useContext } from 'react';
import useDraggable from '../hooks/useDraggable';
import useGridCanvas from '../hooks/useGridCanvas';
import EditorContext from '../context/EditorContext';

export default function MapCanvas() {
  const { editorState } = useContext(EditorContext);
  const { zoom, tileSize, maps, activeMap } = editorState;
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);

  const map = maps[activeMap];
  const width = map ? map.width * zoom : 0;
  const height = map ? map.height * zoom : 0;

  useDraggable({ element: wrapperRef, onElement: canvasRef });
  useGridCanvas(canvasRef, width, height, tileSize * zoom, map ? map.gridColor : '#00FFFF');

  return (
    <div className="card_right-column" style={{ position: 'relative' }} id="canvas_drag_area">
      <div className="canvas_wrapper" id="canvas_wrapper" ref={wrapperRef} style={{ position: 'absolute' }}>
        <canvas id="mapCanvas" ref={canvasRef} width={width} height={height}></canvas>
      </div>
    </div>
  );
}
