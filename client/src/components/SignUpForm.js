import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
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
          setRedirect(true);
          if (redirect === true) {
            navigate("/", { replace: true });
          }
          console.log(res);
          console.log(redirect);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
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
  );
}

export default SignUpForm;
