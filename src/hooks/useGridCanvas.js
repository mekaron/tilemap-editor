import { useEffect } from 'react';

/**
 * Draws a grid on the provided canvas using React hooks.
 * @param {Object} canvasRef - ref to the canvas element
 * @param {number} width - canvas width
 * @param {number} height - canvas height
 * @param {number} [step=16] - grid cell size
 * @param {string} [color='rgba(0,255,217,0.5)'] - grid color
 */
export default function useGridCanvas(
  canvasRef,
  width,
  height,
  step = 16,
  color = 'rgba(0,255,217,0.5)'
) {
  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    for (let x = 0; x < width + 1; x += step) {
      ctx.moveTo(x, 0.5);
      ctx.lineTo(x, height + 0.5);
    }
    for (let y = 0; y < height + 1; y += step) {
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(width, y + 0.5);
    }
    ctx.stroke();
  }, [canvasRef, width, height, step, color]);
}
