import {
  Card,
  CardContent,
  FormGroup,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState, useEffect } from "react";
import "./../styles/TodosList.css";
import ButtonGroup from "@mui/material/ButtonGroup";
import axios from "axios";

function TodosList(props) {
  const id = props.userId;
  const [edit, setEdit] = useState(false);
  const [todoContent, setTodo] = useState({
    title: "",
    description: "",
  });
  console.log(id);
  console.log(props.userId);
  console.log(props)

  const handleEdit = (todo) => {
    setEdit(true);
    console.log(edit);
  }

  const handleOnChange = (e) => {
    setTodo({
      ...todoContent,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e,todo) => {
  e.preventDefault();
  const payload = { ...todoContent };
  const id = localStorage.getItem("localUserId");
  try {
    await axios.patch(`/api/v1/users/${id}/todos/${todo.id}`, payload).then((res) => {
      if (res.status === 200) {
        props.fetchUserTodos();
        setEdit(false);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

  const destroyTodo = (userId, todoId) => {
    axios.delete(`/api/v1/users/${userId}/todos/${todoId}`);
    props.fetchUserTodos();
  };
  return (
    <div>
      {props.todos.length > 0 ? (
        <div className="cardContainer">
          {props.todos.slice().reverse().map((todo) => (
            <Card
              className="card"
              key={todo.id}
              sx={{
                width: "275px",
                height: "15em",
                transform: "rotate(-6deg)",
                boxShadow: "5px 5px 5px black;",
                backgroundColor: "#ffff99;",

                transition: "transform .15s linear",
                ":nth-of-type(even)": {
                  transform: "rotate(4deg)",
                  position: "relative",
                  top: "5px",
                  backgroundColor: "#cfc",
                },
                ":nth-of-type(3n)": {
                  transform: "rotate(-3deg)",
                  position: "relative",
                  top: "-5px",
                  backgroundColor: "#ccf",
                },
                ":nth-of-type(5n)": {
                  transform: "rotate(5deg)",
                  position: "relative",
                  top: "-10px",
                },
                ":hover, :focus": {
                  boxShadow: "10px 10px 7px rgba(0,0,0,.7)",
                  transform: "scale(1.25)",
                  position: "relative",
                  zIndex: "5",
                },
              }}
            >
              <CardContent  onClick = {() => handleEdit(todo)}>
                {edit ? 
                  <FormGroup>
                    <Input
                      label="Title"
                      name="title"
                      variant="standard"
                      multiline
                      placeholder="Title"
                      disableUnderline
                      value={todoContent.title}
                      onChange={handleOnChange}
                      inputProps={{
                        style: { fontFamily: "Permanent Marker", width: "240px" },
                        maxLength: 140,
                        onKeyDown: (e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleSubmit(e, todo);
                          }
        
                          if (e.key === "Escape") {
                            e.preventDefault();
                            props.handleClose();
                          }
                        },
                      }}
                    />                
                    <Input
                      label="Description"
                      name="description"
                      variant="standard"
                      multiline
                      placeholder="Description"
                      disableUnderline
                      value={todoContent.description}
                      onChange={handleOnChange}
                      inputProps={{
                        style: { fontFamily: "Reenie Beanie", width: "240px" },
                        maxLength: 140,
                        onKeyDown: (e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleSubmit(e, todo);
                          }
        
                          if (e.key === "Escape") {
                            e.preventDefault();
                            props.handleClose();
                          }
                        },
                      }}
                    />
                  </FormGroup>
                : 
                <div>
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: "Permanent Marker" }}
                  >
                    {todo.title}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "Reenie Beanie",
                      fontSize: "30",
                      flexShrink: "1",
                    }}
                  >
                    {todo.description}
                  </Typography>
                </div>
                }
                <ButtonGroup className="cardButtons">
                  <IconButton onClick={() => destroyTodo(id, todo.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ButtonGroup>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default TodosList;
