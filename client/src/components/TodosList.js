import React, {useState, useEffect} from 'react'

function TodosList(props) {
  const [todos, setTodos] = useState([])
  console.log(props)

  // useEffect(() => {
  //   async function fetchTodo() {
  //     const todo = await userTodos;
  //     console.log(todos)

  //     if (todo) {
  //       setTodos(todo)
  //     } else {
  //       console.log("Fetch error")
  //     }
  //   }
  
  //   fetchTodo()
  // })
  

  return (
    <div>
      {/* {todos.map((todo) => (
        <div>
          <h2>Task: {todo.title}</h2>
          <h3>Description: {todo.description}</h3>
        </div>
      ))} */}
    </div>
  )
}

export default TodosList