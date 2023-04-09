import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState, useEffect } from "react";
import "./../styles/TodosList.css";
import ButtonGroup from "@mui/material/ButtonGroup";
import axios from "axios";
import { useParams } from "react-router";

interface AppProps {
  userId: number;
  todoId: number;
  fetchUserTodos: Function;
  todos: {
    id: number;
    title: string;
    description: string
  }[]
}


function TodosList(props: AppProps) {
  const id = props.userId;
  console.log(id);
  console.log(props.userId);

  const destroyTodo = (userId: number, todoId: number) => {
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
              <CardContent>
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
                <Typography>
                </Typography>
                {/* <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Completed?" />
                </FormGroup> */}
                <ButtonGroup className="cardButtons">
                  {/* <IconButton>
                    <EditIcon />
                  </IconButton> */}
                  <IconButton onClick={() => destroyTodo(id, todo.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ButtonGroup>
              </CardContent>
              {/* <h3>Created: {todo.created_at.toLocaleString('en')}</h3> */}
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default TodosList;
