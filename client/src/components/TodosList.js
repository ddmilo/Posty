import React, {useState, useEffect} from 'react'

function TodosList(props) {
  const [todos, setTodos] = useState([])
  console.log(props)

  useEffect(() => {
    setTodos(props.todos)
    console.log(todos)

  })
  

  return (

    
    <div>
      {props.todos.length > 0 ? 
      <div>
        {todos.map((todo) => (
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