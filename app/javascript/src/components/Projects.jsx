import React, { useContext } from 'react';
import AuthContext from '../store/AuthContext';
import { getProjects } from '../api/index';


function Projects(){
  const authCtx = useContext(AuthContext);
  // const userLoggedIn = authCtx.loggedIn;
  const token = authCtx.token;

  getProjects({ params: token }).then(res => { 
    console.log(res)
  })
  return <div>Projects</div>
}

export default Projects;