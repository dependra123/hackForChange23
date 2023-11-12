import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Route and Routes from 'react-router-dom'
import './index.css';
import Nav from "./Nav'"
import App from './App';
import Signin from './Signin';
import Signup from './Signup';
import Account from './account';
import Farmer from './farmer';
import SelectType from './selectType';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route path="main" element={<App />} />
          <Route path="signIn" element={<Signin/>}/>
          <Route path="signUp" element={<Signup/>}/>
          <Route path="account" element={<Account/>}/>
          <Route path="select-type" element={<SelectType/>}/>
          <Route path="/farmer/:username" element={<Farmer/>}/>
            {/* <Route path="/buyer/:username" element={<Buyer/>}/> */}
            
          
          </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
