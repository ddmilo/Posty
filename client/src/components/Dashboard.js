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
    const [userTodos, setUserTodos] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(props)
    console.log(props.user.todos.length)
    // console.log(user)
    // console.log(location.state);
    // // console.log(id)
    // console.log(props)

    useEffect(() => {
        setUser(props.user)
        setUserTodos(props.user.todos)
    }, [])
    // useEffect(() => {
    // })
    // useEffect(() => {
    //     async function fetchUser(){
    //         const {id} = localStorage.getItem("localUserId");    
    //         console.log(id)
    //         try {
    //             await axios.get(`/users/${id}`)
    //             .then(res => {
    //                 setUser(res.data)
    //                 console.log(res)
    //             })
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     fetchUser();
    // })

    const setUserDash = () => {
        setUser(props.user)
        console.log("User set in dashboard:" + " " + user)

    }

    const fetchUserTodos = () => {
        const id = props.user.id
        axios.get(`/users/${id}/todos`)
    }

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
                <CreateTodo fetchUserTodo={fetchUserTodos} userId={props.user.id} userName={props.user.first_name}/>
                :
                null
            }
            
                { props.user.todos.length > 0 ?
                
                    <TodosList todos={props.user.todos} fetchUserTodos={fetchUserTodos} />

                    :

                    <h1>NO TODOS</h1>

                }

    
        <Button style={{backgroundColor: 'red' }} variant='contained' onClick={signOut}>Sign Out</Button>
    </div>
  )
}

export default Dashboard