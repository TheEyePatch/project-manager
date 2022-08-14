import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  loggedIn: false,
  login: (token) => {},
  logout: () => {}
});

export function AuthContextProvider(props) {
  const [token, setToken] = useState(null)

  const userLoggedIn = token != null

  const loginHandler = (token) => {
    setToken(token);
    console.log(token)
  }

  const logoutHandler = () => {
    setToken(null);
    console.log('logged_out')
  }

  const AuthContextValue = {
    token: token,
    loggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  }
  return <AuthContext.Provider value={AuthContextValue}>{props.children}</AuthContext.Provider>
}


export default AuthContext;