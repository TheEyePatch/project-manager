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
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false)
  const handleNewProject = () => setModalOpen(true);

  useEffect(() => {
    getProjects({token: token})
    .then(response => {
      setProjects(response);
    })

  }, []);

  return (
    <section style={{
      paddingTop: '1rem',
      paddingTop: '1rem'
    }}>
      <Container>
        <div style={{ 
          margin: '1rem 0 1rem',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <Button variant="contained" size="large" onClick={handleNewProject}>
            New Project
          </Button>
          <ProjectForm modalOpen={modalOpen} setModalOpen={setModalOpen} setProjects={setProjects}/>
        </div>

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
    </section>
    )
}

export default Projects;