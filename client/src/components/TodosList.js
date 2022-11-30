import { Card, CardContent, Checkbox, FormControlLabel, FormGroup, IconButton, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, {useState, useEffect} from 'react'
import './../styles/TodosList.css'
import ButtonGroup from '@mui/material/ButtonGroup';
import axios from 'axios';
import { useParams } from 'react-router';

function TodosList(props) {

  const id = props.userId
  console.log(id)
  console.log(props.userId)


  const destroyTodo = (userId, todoId) => {
    axios.delete(`/users/${userId}/todos/${todoId}`)
    props.fetchUserTodos()
  }
  return (  
    <div>
      TO DO LIST
      {props.todos.length > 0 ? 
      <div className='cardContainer'>

        {props.todos.map((todo) => (
          
            
          <Card className='card' key={todo.id} hover sx={{minWidth: 275}}>
            <CardContent>
              <Typography sx={{fontSize: 14}}>Task</Typography>
              <Typography variant="h5" component="div">
                 {todo.title}
              </Typography>
              <Typography variant="body2">
                  {todo.description}
              </Typography>
              <FormGroup>
                <FormControlLabel control= {<Checkbox />} label='Completed?' />
              </FormGroup>
              <ButtonGroup className='cardButtons'>
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon onClick={() => destroyTodo(id, todo.id)}/>
                </IconButton>
              </ButtonGroup>
            </CardContent>
            {/* <h3>Created: {todo.created_at.toLocaleString('en')}</h3> */}
          </Card>

          
        ))}
      </div>
      :
      null
      }


    </div>
  )
}

export default TodosList