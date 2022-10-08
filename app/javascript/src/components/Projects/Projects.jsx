import React, { useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import { getProjects } from '../../api/index';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material'

const projects = [
  { id: 1, name: 'Project One', description: 'Project Description......', owner_id: 1},
  { id: 2, name: 'Project One', description: 'Project Description......', owner_id: 2},
  { id: 3, name: 'Project One', description: 'Project Description......', owner_id: 2},
  { id: 4, name: 'Project One', description: 'Project Description......', owner_id: 2},
]


const paperStyle = {
  width: '10rem',
  backgroundColor: '#5e17eb'
}

function Projects(){
  const authCtx = useContext(AuthContext);
  // const userLoggedIn = authCtx.loggedIn;
  // const token = authCtx.token;
  console.log(projects)
  // getProjects({ params: token }).then(res => { 
  //   console.log(res)
  // })
  return (
    <div className='project_cards'>
      <Container>
        <Grid container spacing={2}>
          {projects.map((project) => {
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