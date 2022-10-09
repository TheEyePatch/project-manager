import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../store/AuthContext';
import { getProjects } from '../../api/index';
import { Project } from './../index';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material'


function Projects(){
  const authCtx = useContext(AuthContext);
  // const userLoggedIn = authCtx.loggedIn;
  const token = authCtx.token;
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects({token: token})
    .then(response => {
      setProjects(response);
    })

  }, []);

  return (
    <div className='project_cards'>
      <Container>
        <Grid container spacing={2}>
          {projects?.map((project) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={project.id}>
                <Project project={project} />
              </Grid>
              )
          })}
        </Grid>
      </Container>
    </div>
    )
}

export default Projects;