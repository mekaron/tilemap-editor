import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LayerSettings from './LayerSettings';

test('layer opacity reflects props', () => {
  const { rerender } = render(<LayerSettings layerName="Layer 1" opacity={0.5} />);
  expect(screen.getByLabelText(/Opacity/i).value).toBe('0.5');
  expect(screen.getByText('0.5')).toBeTruthy();
  rerender(<LayerSettings layerName="Layer 1" opacity={0.8} />);
  expect(screen.getByLabelText(/Opacity/i).value).toBe('0.8');
  expect(screen.getByText('0.8')).toBeTruthy();
});

test('opacity slider triggers callback', () => {
  const handleOpacityChange = jest.fn();
  render(
    <LayerSettings layerName="Layer" opacity={0.4} onOpacityChange={handleOpacityChange} />
  );
  const slider = screen.getByLabelText(/Opacity/i);
  fireEvent.change(slider, { target: { value: '0.7' } });
  expect(handleOpacityChange).toHaveBeenCalledWith(0.7);
});
