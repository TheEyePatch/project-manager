import React, { useState, useContext } from 'react'
import { Paper, Grid, Avatar, TextField, Button } from '@mui/material'
import { postUserRegistration } from'../../api/index'
import AuthContext from '../../store/AuthContext'

function SignUpForm(){
  const style = { padding: '30px 20px', width: '300px', margin: '20px auto' }
  const [input, setInput] = useState({
    name: '',
    account: '',
    password: ''
  });

  const authContext = useContext(AuthContext)

  const handleInput = (e) => {
    setInput(prevInput => {
      return {
        ...prevInput,
      [e.target.id] : e.target.value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setInput({
      name: '',
      account: '',
      password: ''
    })
  
    postUserRegistration(input).then(res => {
      sessionStorage.setItem('session_token', res.token);
      authContext.login(res.token)
    })
  }

  return (
    <Grid>
      <Paper variant='outlined' style={style}>
        <Avatar/>
        <h1>Sign Up</h1>
        <div>
          <form onSubmit={handleSubmit}>
          <TextField
              name='name'
              id="name"
              label="Name"
              value={input.name}
              fullWidth
              required
              variant="standard" 
              margin="dense"
              onChange={handleInput}
            />

            <TextField
              name='account'
              id="account"
              label="Account"
              value={input.account}
              fullWidth
              required
              variant="standard"
              margin="dense"
              onChange={handleInput}
            />

            <TextField
              name='password'
              id="password"
              label="Password"
              value={input.password}
              fullWidth
              required
              variant="standard"
              type="password"
              margin="dense"
              onChange={handleInput}
            />

            <Button type='submit' variant="contained" color='primary'>Sign Up</Button>
          </form>
        </div>
      </ Paper>
    </Grid>
  )
}

export default SignUpForm;