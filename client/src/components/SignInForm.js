import React, { useState } from 'react'
import axios from 'axios'
import { Button, TextField } from '@mui/material'
import { saveAuthTokens } from '../util/SessionHeaderUtil'



function SignInForm() {
  const [signIn, setSignIn] = useState({
    email: '',
    password: ''
  })

  const handleTextField = (e) => {
    setSignIn({...signIn, [e.target.name]: e.target.value})
    console.log(signIn)
  }


  const handleSubmit = async (e) => {
      e.preventDefault()
      const payload = {
        ...signIn
      }
      try {
          await axios.post('/auth/sign_in', payload)
          .then((res) => {
            console.log(res)
              if (res.status === 200){
                saveAuthTokens(res.headers)
                  console.log(res)
              }
          })

      } catch (err){
          console.log(err)
      }   
  }



  return (
    <div>
        {/* <h1>Sign In Here</h1> */}
        <TextField label='email'name='email' value={signIn.email} onChange={handleTextField} />
        <TextField label='password' name='password' type='password' value={signIn.password} onChange={handleTextField} />
        <Button variant='contained' label='Sign In' onClick={handleSubmit}>Sign In</Button>
    </div>
  )
}

export default SignInForm