import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Button, FormControl } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./../styles/SignUpForm.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: 400,
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: '5px 5px 5px black',
  p: 4
};


function SignUpForm(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const [redirect, setRedirect] = useState(false);

  const handleTextField = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);

    console.log(redirect);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...user,
    };
    try {
      await axios.post("/auth", payload).then((res) => {
        if (res.status === 201) {
          props.handleClose();
          window.location.reload()
          // if (redirect === true) {
          //   navigate("/", { replace: true });
          // }
          console.log(res);
          console.log(redirect);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <FormControl sx={{gap: '200px', display: 'flex', justifyContent:'center', alignContent: 'center'}}>
        <div className="signUp">
          <TextField
            label="email"
            name="email"
            value={user.email}
            onChange={handleTextField}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={user.password}
            onChange={handleTextField}
          />
          <TextField
            label="First Name"
            name="first_name"
            value={user.first_name}
            onChange={handleTextField}
          />
          <TextField
            label="Last Name"
            name="last_name"
            type="last_name"
            value={user.last_name}
            onChange={handleTextField}
          />

          <Button variant="contained" onClick={handleSubmit}>
            Sign Up
          </Button>
        </div>
      </FormControl>
    </Box>
  );
}

export default SignUpForm;
