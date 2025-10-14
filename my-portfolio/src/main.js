import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AppProvider } from './context/AppContext';
import './assets/css/styles.css';
createRoot(document.getElementById('root')).render(_jsx(StrictMode, { children: _jsx(AppProvider, { children: _jsx(App, {}) }) }));
