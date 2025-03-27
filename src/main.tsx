import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

// Create the root once
const root = ReactDOM.createRoot(rootElement);

// Then render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
