import React, { useContext, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { UpdateTaskForm } from './../index'
import { getTask } from '../../api'
import BoardContext from "../../store/BoardContext";

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
