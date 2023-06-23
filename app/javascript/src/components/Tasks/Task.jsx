import React, { useState } from "react";
import { CardActionArea, Card, CardContent, Typography } from '@mui/material';
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
    <Card draggable onDragStart={onDragStart} onDragEnter={onDragEnter} sx={{mb: 1, backgroundColor: backgroundColor}}>
      <CardActionArea onClick={handleClick}>
        <CardContent >
          <Typography gutterBottom variant="h6">
            {currentTask?.title}
          </Typography>
          </CardContent>
      </CardActionArea>

      { modalOpen &&  <UpdateTaskForm task={currentTask} setTask={setCurrentTask} modalOpen={modalOpen} setModalOpen={setModalOpen} />}
    </Card>
  )
}

export default Task;
