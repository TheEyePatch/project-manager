import React, { useState, useContext, useEffect } from 'react'
import { Paper, Grid, Avatar, TextField, Button, Typography } from '@mui/material'
import { updateUserProfile } from'../../api/index'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import AuthContext from '../../store/AuthContext';
import UserContext from '../../store/UserContext';

function UpdateForm({user}){
  const style = { padding: '30px 20px', width: '300px', margin: '20px auto' }
  const [input, setInput] = useState(user);
  const authCtx = useContext(AuthContext)
  const userCtx = useContext(UserContext)

  const [errorInput, setErrorInput] = useState({
    email: {invalid: false, message: ''},
    account: {invalid: false, message: ''},
    first_name: {invalid: false, message: ''},
    last_name: {invalid: false, message: ''},
  })

  const handleInput = (e) => {
    setInput(prevInput => { return {...prevInput, [e.target.id] : e.target.value }})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO
    updateUserProfile({ params:{ user: input }, token: authCtx.token })
    .then(res => userCtx.setCurrentUser(res))

    setInput(user)
  }

  const handleImage = (e) => {
    const file = e.currentTarget.files[0]
    const fileUrl = URL.createObjectURL(file)
    const formData = new FormData()
    formData.append('image', file, file.name)
    setInput(prev => { return { ...prev, avatar_url: fileUrl } })

    updateUserProfile({ params: formData, token: authCtx.token })
    .then(res => userCtx.setCurrentUser(res))
  }

  return (
    <Grid>
      <Paper variant='outlined' style={{ ...style }}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{ display: 'flex', alignItems: 'flex-end', position: 'relative' }}>
            <Avatar alt={input.account}
              size='large'
              src={input.avatar_url}
              sx={{ width: '5rem', height: '5rem', fontSize: '2rem' }}>
              {input.account[0]}
            </Avatar>
            <IconButton style={{ position: 'absolute', top: '50px', left: '50px'}}
              size="medium"
              variant="contained"
              aria-label="upload picture"
              component="label">
              <input hidden accept="image/*" type="file" onChange={handleImage}/>
              <PhotoCamera />
            </IconButton>
          </div>
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
              <Button style={{width: '100%'}} type='submit' variant="contained" color='primary'>Update Profile</Button>
            </div>
          </form>
      </ Paper>
    </Grid>
  )
}

export default UpdateForm;