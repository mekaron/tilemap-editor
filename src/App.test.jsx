import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

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
