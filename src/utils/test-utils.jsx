import React from 'react';
import { render } from '@testing-library/react';
import EditorProvider from '../context/EditorProvider';

const AllTheProviders = ({ children }) => {
  return <EditorProvider>{children}</EditorProvider>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
