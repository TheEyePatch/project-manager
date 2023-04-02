import React, { useContext, useState } from 'react'
import { Paper, Grid, Avatar, TextField, Button, Typography } from '@mui/material'
import { createUserSession } from '../../api'
import AuthContext from '../../store/AuthContext'

function LoginForm({setFormType}){
  const [input, setInput] = useState({
    email: '',
    password: '',
  })

  const [errorInput, setErrorInput] = useState({invalid: false, message: ''})
  const authCtx = useContext(AuthContext)

  const handleInput = (e) => {
    setInput(prev =>{ return { ...prev, [e.target.id]: e.target.value }})
  }
  const loginHandler = (e) => {
    e.preventDefault();

    createUserSession({sign_in: input}).then(res => {
      if(res.token){
        authCtx.login(res.token)
      }else {
      setErrorInput({ invalid: true, message: 'Invalid Email or Password' })
     }
    })
  }

  const style = { padding: '30px 20px', width: '300px', margin: '20px auto' }
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
          }}>Sign In</Typography>

          <form onSubmit={loginHandler}>
            <TextField
              error={errorInput.invalid}
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
              error={errorInput.invalid}
              helperText={errorInput.message}
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
            <div style={{marginTop: '2rem'}}>
              <Button type='submit' variant="contained" color='primary'>Sign In</Button>
              <Button
                type='button'
                color='primary'
                onClick={() => setFormType(false)}
                >
                  Create User
                </Button>
            </div>

          </form>
      </Paper>
    </Grid>
  )
}

export default LoginForm;