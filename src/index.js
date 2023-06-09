import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { DataContextProvidor } from './Context/DataContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BrowserRouter>
   <DataContextProvidor>
   <App />
   </DataContextProvidor>
   </BrowserRouter>
  </React.StrictMode>
);

