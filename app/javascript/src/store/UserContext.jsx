import React, { useState, useContext } from 'react';
import AuthContext from './AuthContext'
import { getUserProfile, getProjectMembers } from '../api'

const UserContext =  React.createContext({
  currentUser: {},
  fetchCurrentUser: () => {},
  setCurrentUser: () => {},
  fetchProjectMembers: () => {},
  setProjectMembers: () => {},
  projectMembers: []
});

export function UserContextProvider ({ children }) {
  const authCtx = useContext(AuthContext)
  const [currentUser, setCurrentUser] = useState({})
  const [projectMembers, setProjectMembers] = useState([])
  const fetchCurrentUser = () => getUserProfile(authCtx.token)
  const fetchProjectMembers = (params = {}) => {
    return getProjectMembers({params: params, token: authCtx.token})
  }

  const userContextValue = {
    currentUser: currentUser,
    fetchCurrentUser: fetchCurrentUser,
    setCurrentUser: setCurrentUser,
    fetchProjectMembers: fetchProjectMembers,
    setProjectMembers:setProjectMembers,
    projectMembers: projectMembers,
  }

  return <UserContext.Provider value={userContextValue}>{ children }</UserContext.Provider>
}

export default UserContext;
