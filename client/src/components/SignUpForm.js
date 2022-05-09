import {React, useState} from 'react'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import axios from 'axios'

function SignUpForm() {
    const[user, setUser] = useState({
        username: '',
        password: ''
    })

    const handleTextField = e => {
        setUser({ [e.target.name]: e.target.value });
        console.log(user)
      };
    
    const handleSubmit = async () => {
        const payload = {
            username: user.username,
            password: user.password
        }
        try {
            await axios.post('/users', payload)
            .then((res) => {
                if (res.status === 201){

                }
            })

        } catch (err){
            console.log(err)
        }   
    }


  return (
    <div>
       <TextField label='Username' name='username' onChange={handleTextField}/>
       <TextField label='Password' type='password' name='password' onChange={handleTextField} />
       <Button variant='contained' onClick={handleSubmit}>Sign Up</Button>
    </div>
  )
}

export default SignUpForm