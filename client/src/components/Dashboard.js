import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import setAxiosDefaults, {
  clearAuthTokens,
  userIsLoggedIn,
} from "../util/SessionHeaderUtil";
import CreateTodo from "./CreateTodo";
import Nav from "./Nav";
import TodosList from "./TodosList";

function Dashboard(props) {
  const [user, setUser] = useState([]);
  const [showTodoForm, setTodoForm] = useState(false);
  const [userTodos, setUserTodos] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUser(props.user);
    setUserTodos(props.user.todos);
  }, []);

  const setUserDash = () => {
    setUser(props.user);
  };

  const fetchUserTodos = () => {
    const id = props.user.id;
    axios.get(`/api/v1/users/${id}/todos`).then((res) => {
      props.setTodos(res.data);
    });
  };

  const signOut = () => {
    clearAuthTokens();
    props.setLoggedFalse();
    navigate("/", { replace: true });
  };

  const handleCreateTaskButton = () => {
    if (showTodoForm === false) {
      setTodoForm(true);
    } else {
      setTodoForm(false);
    }
  };
  // console.log(user)
  // console.log(user.todos.length)

  return (
    <div>
      <header className=".header">
        <Nav
          userName={props.user.first_name}
          signOut={signOut}
          showTodoForm={showTodoForm}
          handleCreateTaskButton={handleCreateTaskButton}
          fetchUserTodo={fetchUserTodos}
          userId={props.user.id}
        />
      </header>

      {showTodoForm ? (
        <CreateTodo handleCreateTaskButton={handleCreateTaskButton} />
      ) : null}

      {/* {props.user.todos.length > 0 ? (
        <TodosList
          todos={props.userTodos}
          fetchUserTodos={fetchUserTodos}
          userId={props.user.id}
        />
      ) : (
        null
      )} */}
      <TodosList
        todos={props.userTodos}
        userId={props.user.id}
        fetchUserTodos={fetchUserTodos}
      />
    </div>
  );
}

export default Dashboard;
