import React, { useState } from "react";
import axios from "axios";
import { Box, Button, FormControl, Modal, TextField, Typography } from "@mui/material";
import { saveAuthTokens, saveUserId } from "../util/SessionHeaderUtil";
import { Navigate, useNavigate, useLocation } from "react-router";
import "./../styles/SignInForm.css";
import { Link } from "react-router-dom";
import SignUpForm from "./SignUpForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: 400,
  width: 400,
  backgroundColor: "white",
  border: "2px solid #000",
  boxShadow: '5px 5px 5px black',
  p: 4
};

function SignInForm() {
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const navigate = useNavigate();
  // const location = useLocation();

  const handleTextField = (e) => {
    setSignIn({ ...signIn, [e.target.name]: e.target.value });
    console.log(signIn);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...signIn,
    };
    try {
      const response = await axios.post("/api/v1/auth/sign_in", payload);
      const userInfo = response.data.data;
      const userId = response.data.data.id;
      console.log(userInfo);
      saveAuthTokens(response.headers);
      saveUserId(userId);
      window.location.reload();
      // navigate(`/dashboard/${userId}`, {replace: true}, {state: {userInfo}})
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // <Box style={style}>
      <div className="signIn">
        <FormControl sx={{gap:'20px'}}>
          {/* <h1>Sign In Here</h1> */}
          <TextField
            label="Email"
            name="email"
            variant="standard"
            value={signIn.email}
            onChange={handleTextField}
            
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="standard"
            value={signIn.password}
            onChange={handleTextField}
          />
          <Button variant="contained" label="Sign In" onClick={handleSubmit}>
            Sign In
          </Button>
          <Button variant="text" sx={{color: 'white'}} onClick={handleOpen}>Don't have an account? Click me.</Button>
          <Modal open={open}>
          <Box sx={style}>
            <SignUpForm
              open={open}
              onClose={handleClose}
              handleClose={handleClose}
            />
          </Box>
        </Modal>
        </FormControl>
      </div>
    //  </Box>
  );
}

export default SignInForm;
