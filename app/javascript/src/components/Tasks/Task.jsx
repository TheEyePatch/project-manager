import React, { useState } from "react";
import { Card, CardContent, Typography, Stack, Chip } from '@mui/material';
import { UpdateTaskForm } from './../index'
import { getTask } from '../../api'

function Task({ task, onDragStart, onDragEnter, backgroundColor, token }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState(task)

  const handleClick = () => {
    getTask({
      token: token,
      task_id: task.id
    })
    .then(res => {
      setModalOpen(true)
      setCurrentTask(res)
    })
  }

  return (
    <div draggable onDragStart={onDragStart} onDragEnter={onDragEnter} style={{margin: '.5rem'}}>
      <Card variant='outlined' onClick={handleClick} style={{backgroundColor: backgroundColor}}>
        <CardContent>
          <Typography gutterBottom variant="h5">
            {currentTask?.title}
          </Typography>

          <Stack direction="row-reverse" spacing={1}>
            <Chip label={task.tag} variant="outlined" size='small' color='secondary'/>
          </Stack>
          </CardContent>
      </Card>

      { modalOpen &&  <UpdateTaskForm task={currentTask} setTask={setCurrentTask} modalOpen={modalOpen} setModalOpen={setModalOpen} />}
    </div>
  )
}

export default Task;
