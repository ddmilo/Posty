// import logo from './logo.svg';
import SignInForm from './SignInForm';
import {Link, useNavigate, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { setAxiosDefaults, userIsLoggedIn} from '../util/SessionHeaderUtil';
import Dashboard from './Dashboard';


function Home(props) {
  const [isSignedIn, setIsSignedIn] = useState(false)
  // const [setUser, SetTheUser] = useState([])
  const navigate = useNavigate();
  const id = props.user.id
  console.log(props)
  console.log(props.isLoggedIn)


  // isLoggedIn();
//   useEffect(() => {
//     console.log(localStorage)
//     async function fetchData(){
//       try {
//         await setAxiosDefaults();
//         const signedIn = userIsLoggedIn();
//         if (signedIn){
//             const response = await axios.get("/auth/validate_token", {
//                 headers: {
//                     uid: localStorage.getItem("uid"),
//                     client: localStorage.getItem("client"),
//                     "access-token": localStorage.getItem("access-token"),
//                     expiry: localStorage.getItem("expiry")
//                 }
//             });
//                axios.get(`/users/${response.data.data.id}`)
//                     .then(res => {
//                       SetTheUser(res.data)
//                       // navigate(`/dashboard/${response.data.data.id}`)
//                       navigate(`/dashboard/${response.data.data.id}`, {state:{name: setUser.email}})
//                     })


//                         // const userData = res.data
//                         // SetTheUser(setUser => ({...setUser, userData}))
//                         // console.log(userData)
//                         // console.log(setUser)


//         }
//       } catch (error) {
//         console.log(error);
//       }

//     }
//     fetchData();
//   }, [])

// console.log(setUser)
  return (
    <div className="Home">
      { props.dataLoaded && props.user.length > 0 ? <Dashboard  user={props.user} userId={props.user.id} setLoggedFalse={props.setLoggedFalse}/> 
      
      
      : 
      
      <div>
        <div>
          Sign Out
        </div>
        <SignInForm />
        <Link to="/signup">Don't have an account?
        Register here.</Link>
       </div>
      
      }




    </div>
  );
}

export default Home;
