import React from 'react';

export default function MapCanvas({ width, height }) {
  return (
    <div className="card_right-column" style={{ position: 'relative' }} id="canvas_drag_area">
      <div className="canvas_wrapper" id="canvas_wrapper">
        <canvas id="mapCanvas" width={width} height={height}></canvas>
      </div>
    </div>
  );
}
