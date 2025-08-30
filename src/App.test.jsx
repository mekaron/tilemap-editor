import React from 'react';
import { render, screen } from './utils/test-utils';
import App from './App';

jest.mock('golden-layout', () => ({
  GoldenLayout: jest.fn(() => ({
    registerComponent: jest.fn(),
    loadLayout: jest.fn(),
    destroy: jest.fn(),
  })),
}));

test('App renders menu items', () => {
  const { container } = render(<App />);
  expect(screen.getByText(/File/i)).toBeTruthy();
  expect(container.querySelector('.tileset_opt_field.header')).toMatchSnapshot();
});

test('App renders tool buttons', () => {
  const { container } = render(<App />);
  expect(screen.getByTitle('paint tiles')).toBeTruthy();
  expect(container.querySelector('#toolButtonsWrapper')).toMatchSnapshot();
});
