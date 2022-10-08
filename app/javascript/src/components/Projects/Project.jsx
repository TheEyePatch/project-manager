import React from 'react';
import { Card, CardHeader, CardContent, IconButton, Typography} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';

function Project({ project }){
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
          subheader={project.owner}
        />
        <CardContent>
          <Typography variant='body2' color='textSecondary'>
            {project.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default Project;