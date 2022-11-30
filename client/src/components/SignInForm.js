import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { saveAuthTokens, saveUserId } from "../util/SessionHeaderUtil";
import { Navigate, useNavigate, useLocation } from "react-router";

function SignInForm() {
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });

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
      const response = await axios.post("/auth/sign_in", payload);
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
    <div>
      {/* <h1>Sign In Here</h1> */}
      <TextField
        label="email"
        name="email"
        value={signIn.email}
        onChange={handleTextField}
      />
      <TextField
        label="password"
        name="password"
        type="password"
        value={signIn.password}
        onChange={handleTextField}
      />
      <Button variant="contained" label="Sign In" onClick={handleSubmit}>
        Sign In
      </Button>
    </div>
  );
}

export default SignInForm;
