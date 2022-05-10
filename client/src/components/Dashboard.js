import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useNavigate, useLocation, useParams } from 'react-router-dom';
import setAxiosDefaults, { clearAuthTokens, userIsLoggedIn } from '../util/SessionHeaderUtil'

function Dashboard() {
    const [user, setUser] = useState([])
    const navigate = useNavigate();
    const location = useLocation();
    const {id} = useParams();    
    console.log(location.state);

    useEffect(() => {
        async function fetchUser(){
            try {
                await axios.get(`/users/${id}`)
                .then(res => {
                    setUser(res.data)
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser();
    }, [])

    const signOut = () => {
        clearAuthTokens()
        navigate('/', {replace: true})

    }

    
  return (
    <div>
        <h1>Hello {user.first_name}, Welcome to your dashboard!</h1>
        <Button variant='text' >Create Task</Button>
        <Button style={{backgroundColor: 'red' }} variant='contained' onClick={signOut}>Sign Out</Button>
    </div>
  )
}

export default Dashboard