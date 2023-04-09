import React, { useState, useContext } from 'react';
import { Card, CardHeader, CardContent, IconButton, Typography, CardActions, Button} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { useNavigate } from "react-router-dom"
import { UpdateProjectForm } from './../index';
import AuthContext from '../../store/AuthContext'
import ProjectContext from '../../store/ProjectContext';
import { deleteProject, getBoards } from '../../api';

function Project({ project, handleOpenEdit }){
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext)
  const projectCtx = useContext(ProjectContext)

  const deleteProjectHandler = (project) => {
    const newProjects = projectCtx.projects.filter((item) => item.id != project.id)
    projectCtx.setProjects(newProjects)
  }

  const handleProjectDelete = () => {
    deleteProject({token: authCtx.token, project_id: project.id})
    .then(res => deleteProjectHandler(res.project))
  }

  return (
    <div>
      <Card elevation={2}>
        <CardHeader
          action={
            <IconButton onClick={handleProjectDelete}>
              <DeleteOutline/>
            </IconButton>
          }
          title={project.name + ' ' + project.id}
          subheader={`Owner: ${project.owner.account}`}
        />
        <CardContent>
          <Typography noWrap variant='body2' color='textSecondary'>
            {project.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small' onClick={() => navigate(`/boards/${project.id}`)}>
            View
          </Button>
          <Button size='small' onClick={(e) => handleOpenEdit(project)}>
            Edit
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default Project;