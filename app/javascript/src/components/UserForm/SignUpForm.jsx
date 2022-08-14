import React, { useState, useContext } from 'react'
import { Paper, Grid, Avatar, TextField, Button } from '@mui/material'
import { postUserRegistration, postUserSession } from'../../api/index'
import AuthContext from '../../store/AuthContext'

function SignUpForm(){
  const style = { padding: '30px 20px', width: '300px', margin: '20px auto' }
  const [isLoginForm, setisLoginForm] = useState(false)
  const [formState, setFormState] = useState({
    submit: 'Sign Up',
    formFormat: 'Login Existing Account'
  })
  const [input, setInput] = useState({
    name: '',
    account: '',
    password: ''
  });

  const authContext = useContext(AuthContext)
  const renderFormState = () => {
    if(isLoginForm){
      setisLoginForm(false)
      setFormState({
        submit: 'Sign In',
        formFormat: 'Create New Account'
      })
    }else if(!isLoginForm){
      setisLoginForm(true)
      setFormState({
        submit: 'Sign Up',
        formFormat: 'Login Existing Account'
      })
    }
  }

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
  
    const sendRequest = isLoginForm ? postUserSession : postUserRegistration
    sendRequest(input).then(res => {
      sessionStorage.setItem('session_token', res.token);
      authContext.login(res.token)
    })
  
    setInput({
      name: '',
      account: '',
      password: ''
    })
  }

  return (
    <Grid>
      <Paper variant='outlined' style={style}>
        <Avatar/>
        <h1>Sign Up</h1>
        <div>
          <form onSubmit={handleSubmit}>
          { !isLoginForm && <TextField
              name='name'
              id="name"
              label="Name"
              value={input.name}
              fullWidth
              required
              variant="standard" 
              margin="dense"
              onChange={handleInput}
            />}

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

            <Button type='submit' variant="contained" color='primary'>{formState.submit}</Button>
          </form>
        </div>
        <Button onClick={renderFormState}>{formState.formFormat}</Button>
      </ Paper>
    </Grid>
  )
}

export default SignUpForm;