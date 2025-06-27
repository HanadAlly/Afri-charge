// client/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // NEW: Import AuthProvider

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider> {/* NEW: Wrap App with AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);