import React, { useState, useContext } from 'react';
import { getProjects } from '../api';
import AuthContext from './AuthContext';

const ProjectContext = React.createContext({
  projects: [],
  projectCount: 0,
  setProjects: () => {},
  fetchProjects: () => {},
  setProjectCount: () => {}
});

export function ProjectContextProvider({children}) {
  const [projects, setProjects] = useState([])
  const [projectCount, setProjectCount] = useState(0)
  const authCtx = useContext(AuthContext)
  const fetchProjects = (params) => {
    return getProjects({
      params: params,
      token: authCtx.token
    })
  }

  const ProjectContextValue = {
    projects: projects,
    projectCount: projectCount,
    setProjects: setProjects,
    fetchProjects: fetchProjects,
    setProjectCount: setProjectCount
  }

  return <ProjectContext.Provider value={ProjectContextValue}>{children}</ProjectContext.Provider>
}

export default ProjectContext
