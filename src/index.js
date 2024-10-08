import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ReduxProvider from "./Redux/provider"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ReduxProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ReduxProvider>
);
