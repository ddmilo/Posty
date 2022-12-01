import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  FormControl,
  FormGroup,
  IconButton,
  Input,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { React, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { default as CustomInput } from "./CustomInput";

function CreateTodo(props) {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...todo };
    const id = localStorage.getItem("localUserId");
    try {
      await axios.post(`/api/v1/users/${id}/todos`, payload).then((res) => {
        if (res.status === 201) {
          props.fetchUserTodo();
          props.handleClose();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        width: "600px",
        height: "600px",
      }}
    >
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
            transform: "scale(1.45)",
            position: "relative",
            zIndex: "5",
          },
        }}
      >
        <CardContent>
          <FormGroup type="submit" style={{position: 'relative'}}>
            <Input
              label="Title"
              name="title"
              variant="standard"
              placeholder="Title"
              multiline
              value={todo.title}
              disableUnderline
              onChange={handleOnChange}
              inputProps={{
                style: { fontFamily: "Permanent Marker", width: "240px" },
                maxLength: 40,
                onKeyDown: (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit(e);
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
              value={todo.description}
              onChange={handleOnChange}
              inputProps={{
                style: { fontFamily: "Reenie Beanie", width: "240px" },
                maxLength: 140,
                onKeyDown: (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit(e);
                  }

                  if (e.key === "Escape") {
                    e.preventDefault();
                    props.handleClose();
                  }
                },
              }}
            />
          </FormGroup>

          {/* <ButtonGroup className="cardButtons">
            <Button
              type='submit'
              variant="contained"
              onClick={handleSubmit}
              style={{
                position: "absolute",
                top: "-5px",
                left: "240px",
              }}
            >
              Shtick
            </Button>
          </ButtonGroup> */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "absolute",
              bottom: "5px",
              right: '58px'
            }}
          >
            <Typography
              variant="caption"
              sx={{ fontSize: "6", fontFamily: "Permanent Marker" }}
            >
              Press "Enter" to <span style={{ color: "green" }}>Save</span>
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontFamily: "Permanent Marker" }}
            >
              Press "Escape" to <span style={{ color: "red" }}>Cancel</span>
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateTodo;
