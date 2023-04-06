import React, { useState, useContext, useEffect } from 'react'
import { Paper, Grid, Avatar, TextField, Button, Typography } from '@mui/material'
import { updateUserProfile } from'../../api/index'

function UpdateForm({user, token}){
  const style = { padding: '30px 20px', width: '300px', margin: '20px auto' }
  const [input, setInput] = useState(user);

  const [errorInput, setErrorInput] = useState({
    email: {invalid: false, message: ''},
    account: {invalid: false, message: ''},
    first_name: {invalid: false, message: ''},
    last_name: {invalid: false, message: ''},
    password: {invalid: false, message: ''},
    password_confirmation: {invalid: false, message: ''},
  })

  const handleInput = (e) => {
    setInput(prevInput => { return {...prevInput, [e.target.id] : e.target.value }})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO
    updateUserProfile({ params:{ user: input }, token: token })
    .then(res => console.log(res))
    setInput(user)
  }

  return (
    <Grid>
      <Paper variant='outlined' style={style}>
        <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
          <Avatar/>
          <Typography
            variant='h5'
            sx={{
              mt: 2,
              display: { md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
          }}>
            {user.account}
          </Typography>
        </div>
        <form onSubmit={handleSubmit}>
          <TextField
              error={errorInput.email.invalid}
              helperText={errorInput.email.message}
              name='email'
              id="email"
              label="Email"
              defaultValue={user.email}
              fullWidth
              required
              variant="standard" 
              margin="dense"
              onChange={handleInput}
            />

            <TextField
              error={errorInput.first_name.invalid}
              helperText={errorInput.first_name.message}
              name='first_name'
              id="first_name"
              label="First Name"
              defaultValue={user.first_name}
              fullWidth
              required
              variant="standard" 
              margin="dense"
              onChange={handleInput}
            />

            <TextField
              error={errorInput.last_name.invalid}
              helperText={errorInput.last_name.message}
              name='last_name'
              id="last_name"
              label="Last Name"
              defaultValue={user.last_name}
              fullWidth
              required
              variant="standard" 
              margin="dense"
              onChange={handleInput}
            />

            <div style={{marginTop: '2rem'}}>
              <Button style={{width: '100%'}} type='submit' variant="contained" color='primary'>Sign Up</Button>
            </div>
          </form>
      </ Paper>
    </Grid>
  )
}

export default UpdateForm;