import React, { useRef } from 'react';
import { render } from '@testing-library/react';
import useGridCanvas from './useGridCanvas';

function TestComponent({ width = 32, height = 32, step = 16, color = 'red' }) {
  const ref = useRef(null);
  useGridCanvas(ref, width, height, step, color);
  return <canvas ref={ref} width={width} height={height} />;
}

test('drawGrid draws lines on canvas', () => {
  const { container } = render(<TestComponent />);
  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  expect(ctx.strokeStyle).toBe('#ff0000');
  expect(ctx.moveTo).toHaveBeenCalled();
  expect(ctx.lineTo).toHaveBeenCalled();
  expect(ctx.stroke).toHaveBeenCalled();
});
