import logo from './logo.svg';
import './App.css';
import SignInForm from './components/SignInForm';
import {Link, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { setAxiosDefaults, userIsLoggedIn} from './util/SessionHeaderUtil';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import SignUpForm from './components/SignUpForm';
import Home from './components/Home';



function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState([])
  // const navigate = useNavigate();

  useEffect(() => {
    console.log(localStorage)
    async function loggedIn(){
      try {
        await setAxiosDefaults()
        const signedIn = userIsLoggedIn();
        console.log(signedIn)
        if (signedIn){
            setLoggedIn(true)
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
                      setUser(res.data)
                      // navigate(`/dashboard/${response.data.data.id}`)
                      // navigate(`/dashboard/${response.data.data.id}`, {state:{name: user.email}})
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
    loggedIn();
  }, [isLoggedIn])

  const setLoggedFalse = () => {
    setLoggedIn(false)
  }

  console.log(isLoggedIn)
  console.log(user)
  


  return (
  <BrowserRouter>
    <Routes>
      <Route path='/'  element={<Home user={user} userId={user.id} isLoggedIn={isLoggedIn}/>} />
      <Route path='/signup' element={<SignUpForm />} />
      <Route path='/dashboard/:id' element={<Dashboard  user={user} userId={user.id} setLoggedFalse={setLoggedFalse}/>} />
    </Routes>
  </BrowserRouter>

  );
}

export default App;
