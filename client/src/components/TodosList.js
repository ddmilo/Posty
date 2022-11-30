import { Card, CardContent, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'

function TodosList(props) {
  return (  
    <div>
      TO DO LIST
      {props.todos.length > 0 ? 
      <div>

        {props.todos.map((todo) => (
          
            
          <Card key={todo.id} sx={{minWidth: 275}}>
            <CardContent>
              <Typography sx={{fontSize: 14}}>Task</Typography>
              <Typography variant="h5" component="div">
                 {todo.title}
              </Typography>
              <Typography variant="body2">
                  {todo.description}
              </Typography>
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