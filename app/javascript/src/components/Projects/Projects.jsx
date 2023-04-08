import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../store/AuthContext';
import UserContext from '../../store/UserContext';
import ProjectContext from '../../store/ProjectContext'
import { getProjects } from '../../api/index';
import { Project, NewProjectForm } from './../index';
import Grid from '@mui/material/Grid';
import { Button, Container, Pagination } from '@mui/material';


function Projects({ projectType, page, setPage }){
  const projectCtx = useContext(ProjectContext)
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    projectCtx.fetchProjects({project_type: projectType, page: page})
    .then(response => {
      projectCtx.setProjects(response.projects)
      setPageCount(Math.ceil(response.project_count / response.page_limit))
      projectCtx.setProjectCount(response.project_count)
    })

  }, [projectType, page]);

  return (
      // TO DO: ADD FILTER FOR SHOWING OWNED PROJECTS AND PARTICIPATED PROJECTS
      <div style={{ boxSizing: 'border-box', padding: '1rem' }}>
        <Grid container spacing={2} style={{ boxSizing: 'border-box', padding: '1rem'}}>
          {projectCtx.projects?.map((project) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={project.id}>
                <Project project={project} isOwned={false}/>
              </Grid>
              )
          })}
        </Grid>
        { projectCtx.projectCount > 1 &&
          <Pagination count={pageCount} siblingCount={2} color="primary" shape="rounded"
            onChange={(e, val) => setPage(val)}
          />
        }
      </div>
    )
}

export default Projects;
