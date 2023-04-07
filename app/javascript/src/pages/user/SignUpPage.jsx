import React, { useState } from "react";
import { LoginForm, SignUpForm } from '../../components/index'
import { Paper, Grid, Avatar, TextField, Button, Typography } from '@mui/material'
import background from '../../images/purple_liquid_bg.jpg'

function SignUpPage() {
  const [isLoginForm, setFormType] = useState(true)

  return (
    <section style={{ boxSizing: 'border-box', overflow: 'auto', paddingTop: '15vh', width: '100vw', height: '100vh', background: `url(${background})`, backgroundSize:'cover' }}>
      {
        isLoginForm ? <LoginForm setFormType={setFormType}/> : <SignUpForm setFormType={setFormType} />
      }
    </section>
    )
}


export default SignUpPage;