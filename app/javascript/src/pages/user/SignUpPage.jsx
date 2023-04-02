import React, { useState } from "react";
import { LoginForm, SignUpForm } from '../../components/index'

function SignUpPage() {
  const [isLoginForm, setFormType] = useState(true)

  return (
    <section>
      {
        isLoginForm ? <LoginForm setFormType={setFormType}/> : <SignUpForm setFormType={setFormType} />
      }
    </section>
    )
}


export default SignUpPage;