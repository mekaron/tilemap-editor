import React from 'react';
import EditorProvider from './context/EditorProvider';
import GoldenLayoutWrapper from './components/GoldenLayoutWrapper';

export default function App() {
  return (
    <EditorProvider>
      <GoldenLayoutWrapper />
    </EditorProvider>
  );
}
