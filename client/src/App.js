import logo from './logo.svg';
import './App.css';
import SignInForm from './components/SignInForm';
import {Link, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { setAxiosDefaults, userIsLoggedIn} from './util/SessionHeaderUtil';


function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [setUser, SetTheUser] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    console.log(localStorage)
    async function fetchData(){
      try {
        await setAxiosDefaults();
        const signedIn = userIsLoggedIn();
        if (signedIn){
            const response = await axios.get("/auth/validate_token", {
                headers: {
                    uid: localStorage.getItem("uid"),
                    client: localStorage.getItem("client"),
                    "access-token": localStorage.getItem("access-token"),
                    expiry: localStorage.getItem("expiry")
                }
            });
               axios.get(`/users/${response.data.data.id}`)
                    .then(res => {
                      SetTheUser(res.data)
                      // navigate(`/dashboard/${response.data.data.id}`)
                      navigate(`/dashboard/${response.data.data.id}`, {state:{name: setUser.email}})
                    })


                        // const userData = res.data
                        // SetTheUser(setUser => ({...setUser, userData}))
                        // console.log(userData)
                        // console.log(setUser)


        }
      } catch (error) {
        console.log(error);
      }

    }
    fetchData();
  }, [])

console.log(setUser)
  return (
    <div className="App">
      <SignInForm />
      <Link to="/signup">Don't have an account? Register here.</Link>
    </div>
  );
}

export default App;
