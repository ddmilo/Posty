import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useNavigate, useLocation, useParams } from 'react-router-dom';
import setAxiosDefaults, { clearAuthTokens, userIsLoggedIn } from '../util/SessionHeaderUtil'
import CreateTodo from './CreateTodo';
import TodosList from './TodosList';

function Dashboard(props) {
    const [user, setUser] = useState([]);
    const [showTodoForm, setTodoForm] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(user)
    console.log(location.state);
    // console.log(id)
    console.log(props)

    useEffect(() => {
        async function fetchUser(){
            const {id} = props.userId;    
            try {
                await axios.get(`/users/${id}`)
                .then(res => {
                    setUser(res.data)
                    console.log(res)
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser();
    }, [])

    const signOut = () => {
        clearAuthTokens()
        props.setLoggedFalse()
        navigate('/', {replace: true})

    }

    const handleCreateTaskButton = () => {
        setTodoForm(true)
        console.log(showTodoForm)
    }
    // console.log(user)
    // console.log(user.todos.length)
    
  return (
    <div>
        <h1>Hello {props.user.first_name}, Welcome to your dashboard!</h1>
        <Button variant='text' onClick={handleCreateTaskButton}>Create Task</Button>
            {showTodoForm ? 
                <CreateTodo userId={user.id} userName={user.first_name}/>
                :
                null
            }
            {/* {user.todos.length > 0 ?
                <TodosList />
                :
                null
            } */}
        <Button style={{backgroundColor: 'red' }} variant='contained' onClick={signOut}>Sign Out</Button>
    </div>
  )
}

export default Dashboard