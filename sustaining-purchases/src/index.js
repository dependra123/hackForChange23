import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Route and Routes from 'react-router-dom'
import './index.css';
import Nav from "./Nav'"
import App from './App';
import Signin from './Signin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route path="main" element={<App />} />
          <Route path="signIn" element={<Signin/>}/>
          </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
