import React, { useRef } from 'react';
import useDraggable from '../hooks/useDraggable';
import useGridCanvas from '../hooks/useGridCanvas';

export default function MapCanvas({ width, height, gridSize = 16, gridColor }) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);

  useDraggable({ element: wrapperRef, onElement: canvasRef });
  useGridCanvas(canvasRef, width, height, gridSize, gridColor);

  return (
    <div className="card_right-column" style={{ position: 'relative' }} id="canvas_drag_area">
      <div className="canvas_wrapper" id="canvas_wrapper" ref={wrapperRef} style={{ position: 'absolute' }}>
        <canvas id="mapCanvas" ref={canvasRef} width={width} height={height}></canvas>
      </div>
    </div>
  );
}
