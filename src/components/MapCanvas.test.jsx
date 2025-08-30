import React from 'react';
import { render } from '@testing-library/react';
import MapCanvas from './MapCanvas';

test('MapCanvas uses width and height props', () => {
  const { container, rerender } = render(<MapCanvas width={100} height={50} />);
  let canvas = container.querySelector('#mapCanvas');
  expect(canvas.getAttribute('width')).toBe('100');
  expect(canvas.getAttribute('height')).toBe('50');
  rerender(<MapCanvas width={200} height={150} />);
  canvas = container.querySelector('#mapCanvas');
  expect(canvas.getAttribute('width')).toBe('200');
  expect(canvas.getAttribute('height')).toBe('150');
});
