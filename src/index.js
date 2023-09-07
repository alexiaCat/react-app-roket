import React from 'react';
import { createRoot } from 'react-dom/client';
import 'font-awesome/css/font-awesome.min.css';
import './styles.css';
import 'leaflet/dist/leaflet.css';
import { Home } from './components/Home';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
