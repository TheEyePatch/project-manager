import React, { useState } from 'react'
import { Paper, Grid, Avatar, TextField, Button } from '@mui/material'

function SignUpForm(){
  const style = { padding: '30px 20px', width: '300px', margin: '20px auto' }
  const [input, setParams] = useState({
    name: '',
    account: '',
    password: ''
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input)
  }

  const handleInput = (e) => {
    setParams(prevInput => ({
      ...prevInput,
      [e.target.id] : e.target.value
    }))
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