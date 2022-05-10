import logo from './logo.svg';
import './App.css';
import SignInForm from './components/SignInForm';
import {Link, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { setAxiosDefaults, userIsLoggedIn} from './util/SessionHeaderUtil';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import SignUpForm from './components/SignUpForm';
import Home from './components/Home';



function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<SignUpForm />} />
      <Route path='/dashboard/:id' element={<Dashboard />} />
    </Routes>
  </BrowserRouter>

  );
}

export default App;
