import React from 'react'
import { Paper, Grid, Avatar, TextField, Button } from '@mui/material'

function SignUpForm(){
  const style = { padding: '30px 20px', width: '300px', margin: '20px auto' }
  return (
    <Grid>
      <Paper variant='outlined' style={style}>
        <Avatar/>
        <h1>Sign Up</h1>
        <div>
          <form>
            <TextField fullWidth required id="email" label="Email" variant="standard" margin="dense" />
            <TextField fullWidth required id="name" label="Name" variant="standard"  margin="dense"/>
            <TextField fullWidth required id="password" label="Password" variant="standard" type="password" margin="dense"/>
            <Button type='submit' variant="contained" color='primary'>Sign Up</Button>
          </form>
        </div>
      </ Paper>
    </Grid>
  )
}

export default SignUpForm;