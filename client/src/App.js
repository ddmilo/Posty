import logo from './logo.svg';
import './App.css';
import SignInForm from './components/SignInForm';
import {Link, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getAxiosDefaults, userIsLoggedIn} from './util/SessionHeaderUtil';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import SignUpForm from './components/SignUpForm';
import Home from './components/Home';



function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)
  // const navigate = useNavigate();

  useEffect(() => {
    async function loggedIn(){
      try {
        const signedIn = await userIsLoggedIn();
        await getAxiosDefaults()
        console.log(signedIn)
        if (signedIn){
            const response = await axios.get("/auth/validate_token", {
                headers: {
                    uid: localStorage.getItem("uid"),
                    client: localStorage.getItem("client"),
                    "access-token": localStorage.getItem("access-token"),
                    expiry: localStorage.getItem("expiry"),
                    'content-type': 'application/json'
                }
            });
            console.log(response)
            fetchUser(response.data.data.id)
            // await axios.get(`/users/${response.data.data.id}`)
            //     .then(res => {
            //       setUser(res.data)
            //       // navigate(`/dashboard/${response.data.data.id}`)
            //       // navigate(`/dashboard/${response.data.data.id}`, {state:{name: user.email}})
            //     })
                
                setLoggedIn(true)


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

  const fetchUser = (userId) => {
   axios.get(`/users/${userId}`)
    .then(res => {
      setUser(res.data) 
      setDataLoaded(true)

    })

    console.log(user)

  }

  const setLoggedFalse = () => {
    setLoggedIn(false)
  }


  


  return (
  <BrowserRouter>
    <Routes>
      <Route path='/'  element={<Home user={user} userId={user.id} isLoggedIn={isLoggedIn} dataLoaded={dataLoaded} setLoggedFalse={setLoggedFalse}/>} />
      <Route path='/signup' element={<SignUpForm />} />
      <Route path='/dashboard/:id'  element={<Dashboard  user={user} userId={user.id} />} />
    </Routes>
  </BrowserRouter>

  );
}

export default App;
