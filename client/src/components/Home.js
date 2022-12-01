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


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent:'center',
        height: "100vh",
      }}
      className="Home"
    >
      {props.isLoggedIn ? (
        <Dashboard
          userTodos={props.userTodos}
          user={props.user}
          userId={props.user.id}
          setTodos={props.setTodos}
          setLoggedFalse={props.setLoggedFalse}
        />
      ) : (
        <div style={{overflow:'hidden'}}>


          <Typography
            variant="h4"
            sx={{
              fontFamily: "Permanent Marker",
              width: "200px",
              height: "400px",
              position:'relative',
              lineHeight:'0.5',
              top: "60px",
              left: "70px",
              transform: "rotate(-30deg)",
              overflow: 'hidden'
            }}
          >
                      <img
            style={{
              width: "200px",
              left: '400px',
              top: '100px',
              transform: "rotate(12deg)",

            }}
            src={logoNote}
            alt="logo"
          />
            SHTICKY
          </Typography>
          <SignInForm />
        </div>
      )}
    </div>
  );
}

export default Home;
