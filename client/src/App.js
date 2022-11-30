import logo from "./logo.svg";
import "./App.css";
import SignInForm from "./components/SignInForm";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAxiosDefaults, userIsLoggedIn } from "./util/SessionHeaderUtil";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignUpForm from "./components/SignUpForm";
import Home from "./components/Home";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState([]);
  const [userTodos, setUserTodos] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const navigate = useNavigate();
  const randomProp = "This is a prop";
  const location = useLocation();

  const fetchUser = (userId) => {};

  useEffect(() => {
    async function loggedIn() {
      try {
        const signedIn = await userIsLoggedIn();
        await getAxiosDefaults();
        console.log(signedIn);
        if (signedIn) {
          const response = await axios.get("/api/v1/auth/validate_token", {
            headers: {
              uid: localStorage.getItem("uid"),
              client: localStorage.getItem("client"),
              "access-token": localStorage.getItem("access-token"),
              expiry: localStorage.getItem("expiry"),
              "content-type": "application/json",
            },
          });
          console.log(response);
          console.log(response.data.data.id);
          await axios.get(`/api/v1/users/${response.data.data.id}`).then((res) => {
            setUser(res.data);
            setUserTodos(res.data.todos);
            setDataLoaded(true);
            console.log(user);
            console.log(userTodos);
            console.log("Data is loaded: " + dataLoaded);
          });

          setLoggedIn(true);
          if (loggedIn === true) {
            location.reload();
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    loggedIn();
  }, [setUserTodos]);

  const setLoggedFalse = () => {
    setLoggedIn(false);
  };

  const setTodos = (data) => {
    setUserTodos(data);
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              userTodos={userTodos}
              user={user}
              userId={user.id}
              isLoggedIn={isLoggedIn}
              dataLoaded={dataLoaded}
              setLoggedFalse={setLoggedFalse}
              setTodos={setTodos}
            />
          }
        />
        <Route path="/signup" element={<SignUpForm />} />
        <Route
          path="/dashboard/:id"
          element={
            <Dashboard
              randomProp={randomProp}
              setTodos={setTodos}
              user={user}
              userId={user.id}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
