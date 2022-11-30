// import logo from './logo.svg';
import SignInForm from "./SignInForm";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { setAxiosDefaults, userIsLoggedIn } from "../util/SessionHeaderUtil";
import Dashboard from "./Dashboard";
import logoNote from "./../images/logoNote.png";
import { Typography } from "@mui/material";

function Home(props) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();
  const id = props.user.id;
  console.log(props);
  console.log(props.isLoggedIn);

  return (
    <div className="Home">
      {props.isLoggedIn ? (
        <Dashboard
          userTodos={props.userTodos}
          user={props.user}
          userId={props.user.id}
          setTodos={props.setTodos}
          setLoggedFalse={props.setLoggedFalse}
        />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "8%",
          }}
        >
          <img
            style={{
              width: "200px",
              position: 'absolute'
            }}
            src={logoNote}
            alt="logo"
          />

          <Typography
            variant="h4"
            sx={{
              fontFamily: "Permanent Marker",
              width: "200px",
              height: '400px',
              position:'relative',
              top: "30px",
              left: '100px',
              transform: "rotate(-30deg)",
            }}
          >
            SHTICKY
          </Typography>
          <SignInForm />
        </div>
      )}
    </div>
  );
}

export default Home;
