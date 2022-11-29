import React, {useState, useEffect} from 'react'

function TodosList(props) {
  return (  
    <div>
      TO DO LIST
      {props.todos.length > 0 ? 
      <div>
        {props.todos.map((todo) => (
          <div key={todo.id}>
            <h2>Task: {todo.title}</h2>
            <h3>Description: {todo.description}</h3>
          </div>
        ))}
      </div>
      :
      null
      }


    </div>
  )
}

export default TodosList