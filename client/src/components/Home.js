// import logo from './logo.svg';
import SignInForm from "./SignInForm";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { setAxiosDefaults, userIsLoggedIn } from "../util/SessionHeaderUtil";
import Dashboard from "./Dashboard";

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
        <div>
          <div>Sign Out</div>
          <SignInForm />
          <Link to="/signup">Don't have an account? Register here.</Link>
        </div>
      )}
    </div>
  );
}

export default Home;
