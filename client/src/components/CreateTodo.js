import { Button, TextField } from '@mui/material'
import axios from 'axios'
import {React, useState} from 'react'
import { useParams } from 'react-router'

function CreateTodo(props) {
    const [todo, setTodo] = useState({
        title: '',
        description: '', 
    })


    const handleOnChange = (e) => {
        setTodo({...todo, [e.target.name]: e.target.value})
        console.log(todo)
    }

    const handleSubmit = async (e) => {
        const payload = {...todo}
        try {
            await axios.post(`/users/${props.userId}/todos`, payload)
                .then(res => {
                    if(res.status === 201){
                        console.log("ToDo created successfully for User:" + " " + props.userName)
                    }
                })
        } catch (error) {
            console.log(error)
        }
        
    }

    
  return (
    <div>
        <TextField label='Title' name='title' value={todo.title} onChange={handleOnChange}/>
        <TextField label='Description' name='description' value={todo.description} onChange={handleOnChange}/>
        <Button variant='contained' onClick={handleSubmit}>Create</Button>
    </div>

    
  )
}



export default CreateTodo