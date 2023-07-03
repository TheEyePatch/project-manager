import React, { useState } from 'react';
import { destroyUserSession } from '../api';
import Cookies from 'universal-cookie';

const AuthContext = React.createContext({
  token: '',
  loggedIn: false,
  login: (token) => {},
  logout: () => {}
});

export function AuthContextProvider(props) {
  const initialToken = sessionStorage.getItem('session_token');
  const [token, setToken] = useState(initialToken);
  const cookies = new Cookies()

  const userLoggedIn = token != null

  const loginHandler = (token) => {
    setToken(token);
    if(token) {
      sessionStorage.setItem('session_token', token)
      cookies.set('session_token', token)
    };
  }

  const logoutHandler = () => {
    sessionStorage.removeItem('session_token');
    sessionStorage.removeItem('subHeaderProjectId')
    cookies.remove('session_token')
    setToken(null);
    destroyUserSession(token)
  }

  const AuthContextValue = {
    token: token || sessionStorage.getItem('session_token'),
    loggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  }
  return <AuthContext.Provider value={AuthContextValue}>{props.children}</AuthContext.Provider>
}


export default AuthContext;