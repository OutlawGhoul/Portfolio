import React from 'react';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './assets/css/index.css';

const App = () => (
  <AppProvider>
      <Sidebar />
      <MainContent />
  </AppProvider>
);

export default App;