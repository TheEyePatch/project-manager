import React, { useState, useContext } from 'react'
import { Paper, Grid, Avatar, TextField, Button, Typography } from '@mui/material'
import { postUserRegistration } from'../../api/index'
import AuthContext from '../../store/AuthContext'

function SignUpForm({setFormType}){
  const style = { padding: '30px 20px', width: '300px', margin: '20px auto' }
  const [input, setInput] = useState({
    email: '',
    account: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirmation: '',
  });

  const [errorInput, setErrorInput] = useState({
    email: {invalid: false, message: ''},
    account: {invalid: false, message: ''},
    first_name: {invalid: false, message: ''},
    last_name: {invalid: false, message: ''},
    password: {invalid: false, message: ''},
    password_confirmation: {invalid: false, message: ''},
  })

  const authContext = useContext(AuthContext);
  const handleInput = (e) => {
    setInput(prevInput => { return {...prevInput, [e.target.id] : e.target.value }})
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    postUserRegistration({register: input}).then(res => {
      if(res.token) {
        authContext.login(res.token)
      } else {
        setErrorInput(prev => {
          let errorObj = { ...prev }

          Object.entries(res.errors).forEach(entry => {
            let [key, value] = entry
            errorObj[key].invalid = true
            errorObj[key].message = value[value.length - 1]
          })

          return errorObj
        })
      }
    })
  
    setInput({
      email: '',
      account: '',
      first_name: '',
      last_name: '',
      password: '',
      password_confirmation: '',
    })
  }

  return (
    <Grid>
      <Paper variant='outlined' style={style}>
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
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
              error={errorInput.email.invalid}
              helperText={errorInput.email.message}
              name='email'
              id="email"
              label="Email"
              value={input.email}
              fullWidth
              required
              variant="standard" 
              margin="dense"
              onChange={handleInput}
            />

            <TextField
              error={errorInput.account.invalid}
              helperText={errorInput.account.message}
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
              error={errorInput.first_name.invalid}
              helperText={errorInput.first_name.message}
              name='first_name'
              id="first_name"
              label="First Name"
              value={input.first_name}
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
              value={input.last_name}
              fullWidth
              required
              variant="standard" 
              margin="dense"
              onChange={handleInput}
            />

            <TextField
              error={errorInput.password.invalid}
              helperText={errorInput.password.message}
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

            <TextField
              error={errorInput.password_confirmation.invalid}
              helperText={errorInput.password_confirmation.message}
              name='password_confirmation'
              id="password_confirmation"
              label="Password Confirmation"
              value={input.password_confirmation}
              fullWidth
              required
              variant="standard"
              type="password"
              margin="dense"
              onChange={handleInput}
            />

            <div style={{marginTop: '2rem'}}>
              <Button style={{width: '100%'}} type='submit' variant="contained" color='primary'>Sign Up</Button>
              <Button style={{ display: 'block', marginTop: '10px', marginLeft: '-5px' }} 
              type='button'
              onClick={() => setFormType(true)}
              >
                Login Existing Account
              </Button>
            </div>
          </form>
      </ Paper>
    </Grid>
  )
}

export default SignUpForm;