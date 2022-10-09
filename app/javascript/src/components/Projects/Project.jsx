import React from 'react';
import { Card, CardHeader, CardContent, IconButton, Typography, CardActions, Button} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';

function Project({ project }){
  const handleViewProject = () => {
    console.log('Clicked')
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
          <Button size='small' onClick={handleViewProject}>
            View
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default Project;