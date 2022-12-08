import React, { useState } from 'react';
import { Card, CardHeader, CardContent, IconButton, Typography, CardActions, Button} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { useNavigate } from "react-router-dom"
import { UpdateProjectForm } from './../index';

function Project({ project }){
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false)

  const editProjectHandler = () => {
    setModalOpen(true)
  }
  return (
    <div>
      <Card elevation={2}>
        <CardHeader
          action={
            <IconButton>
              <DeleteOutline/>
            </IconButton>
          }
          title={project.name}
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
          <Button size='small' onClick={editProjectHandler}>
            Edit
          </Button>
        </CardActions>
      </Card>
      <UpdateProjectForm
          setModalOpen={setModalOpen}
          project={project}
          modalOpen={modalOpen}
          />
    </div>
  )
}

export default Project;