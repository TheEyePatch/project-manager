import React, { useState, useContext } from 'react';
import AuthContext from './AuthContext'
import { getUserProfile } from '../api'

const UserContext =  React.createContext({
  currentUser: {},
  fetchCurrentUser: () => {},
  setCurrentUser: () => {}
});

export function UserContextProvider ({ children }) {
  const authCtx = useContext(AuthContext)
  const [currentUser, setCurrentUser] = useState({})
  const fetchCurrentUser = () => getUserProfile(authCtx.token)

  const userContextValue = {
    currentUser: currentUser,
    fetchCurrentUser: fetchCurrentUser,
    setCurrentUser: setCurrentUser,
  }

  return <UserContext.Provider value={userContextValue}>{ children }</UserContext.Provider>
}

export default UserContext;
