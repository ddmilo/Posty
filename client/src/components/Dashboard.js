import { Button } from '@mui/material';
import axios from 'axios';
import React from 'react'
import {useNavigate, useLocation } from 'react-router-dom';
import setAxiosDefaults, { clearAuthTokens, userIsLoggedIn } from '../util/SessionHeaderUtil'

function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.state);

    const signOut = () => {
        clearAuthTokens()
        navigate('/', {replace: true})

    }
  return (
    <div>
        <h1>User Dashboard</h1>
        <Button variant='contained' onClick={signOut}>Sign Out</Button>
    </div>
  )
}

export default Dashboard