import React, { useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import { getProjects } from '../../api/index';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

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
      <Grid container spacing={3} sx={{ flexGrow: 0 }}>
        {projects.map((project) => {
          return (
            <Grid item xs={12}>
              <Paper elevation={1} style={paperStyle} key={project.id}>
              {project.name}
              </Paper>
            </Grid>
            )
        })}
      </Grid>
    </div>
    )
}

export default Projects;