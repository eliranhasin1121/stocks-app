import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import TikeerRouter from './components/router';
import './index.css';

function App() {
  return (
  <BrowserRouter>
    <TikeerRouter/>
  </BrowserRouter>
  );
}

export default App;
