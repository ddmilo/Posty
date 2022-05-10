import React from 'react';
import {Route as Path} from 'react-router';
import Dashboard from '../components/Dashboard';
import Home from '../components/Home';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';


function routes() {
  return (
    <div>
        <Path 
            path = '/'
            element={<Home />}
        />
        <Path 
            path = 'signup'
            element={<SignUpForm />}
        />
        <Path 
          path ='/dashboard/:id'
          element={<Dashboard />}
        />
    </div>
  )
}

export default routes