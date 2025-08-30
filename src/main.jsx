import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { EditorProvider } from './context/EditorContext';

ReactDOM.createRoot(document.getElementById('tilemapjs_root')).render(
  <React.StrictMode>
    <EditorProvider>
      <App />
    </EditorProvider>
  </React.StrictMode>
);
