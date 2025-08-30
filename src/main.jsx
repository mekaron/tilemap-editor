import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import EditorProvider from './context/EditorProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <EditorProvider>
        <App />
      </EditorProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
