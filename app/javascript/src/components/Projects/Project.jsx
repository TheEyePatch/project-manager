import React, { useState, useContext } from 'react';
import { Card, CardHeader, CardContent, IconButton, Typography, CardActions, Button} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { useNavigate } from "react-router-dom"
import { UpdateProjectForm } from './../index';
import AuthContext from '../../store/AuthContext'
import { deleteProject } from '../../api';

function Project({ project, deleteProjectHandler }){
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState(project)

  const editProjectHandler = () => {
    setModalOpen(true)
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
          title={currentProject.name}
          subheader={`Owner: ${currentProject.owner.account}`}
        />
        <CardContent>
          <Typography noWrap variant='body2' color='textSecondary'>
            {currentProject.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small' onClick={() => navigate(`/boards/${project.id}`)}>
            View
          </Button>
          <Button size='small' onClick={editProjectHandler}>
            Edit
          </Button>
        </CardActions>
      </Card>
      <UpdateProjectForm
          setModalOpen={setModalOpen}
          project={currentProject}
          modalOpen={modalOpen}
          setCurrentProject={setCurrentProject}
          />
    </div>
  )
}

export default Project;