import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../store/AuthContext';
import { getProjects } from '../../api/index';
import { Project, ProjectForm } from './../index';
import Grid from '@mui/material/Grid';
import { Button, Container } from '@mui/material';


function Projects(){
  const authCtx = useContext(AuthContext);
  // const userLoggedIn = authCtx.loggedIn;
  const token = authCtx.token;
  const [ownedProjects, setOwnedProjects] = useState([]);
  const [participatedProjects, setParticipatedProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false)
  const handleNewProject = () => setModalOpen(true);

  useEffect(() => {
  getProjects({token: token})
    .then(response => {
      setOwnedProjects(response.owned_projects);
      setParticipatedProjects(response.participated_projects)
    })

  }, []);

  return (
      // TO DO: ADD FILTER FOR SHOWING OWNED PROJECTS AND PARTICIPATED PROJECTS
      <Container>
        <div style={{ 
          margin: '1rem 0 1rem',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <Button variant="contained" size="large" onClick={handleNewProject}>
            New Project
          </Button>
          <ProjectForm modalOpen={modalOpen} setModalOpen={setModalOpen} setOwnedProjects={setOwnedProjects}/>
        </div>

        <h1>Owned Projects</h1>
        <Grid container spacing={2}>
          {ownedProjects?.map((project) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={project.id}>
                <Project project={project} />
              </Grid>
              )
          })}
        </Grid>

        <h1>Participated Projects</h1>
        <Grid container spacing={2}>
          {participatedProjects?.map((project) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={project.id}>
                <Project project={project} />
              </Grid>
              )
          })}
        </Grid>
      </Container>
    )
}

export default Projects;