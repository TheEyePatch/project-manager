import React from 'react';
import { Card, CardHeader, CardContent, IconButton, Typography, CardActions, Button} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { useNavigate } from "react-router-dom"

function Project({ project }){
  const navigate = useNavigate();

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
        </CardActions>
      </Card>
    </div>
  )
}

export default Project;