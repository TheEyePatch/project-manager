import React from 'react'
import { Paper, Grid, Avatar } from '@mui/material'

function SignUpForm(){
  const style = { padding: '30px 20px', width: '300px', margin: '20px auto' }
  return (
    <Grid>
      <Paper elevation={8} variant='outlined' style={style}>
        <Avatar/>
        <h1>Sign Up</h1>
      </ Paper>
    </Grid>
  )
}

export default SignUpForm;