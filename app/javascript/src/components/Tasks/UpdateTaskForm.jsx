import React, { useState, useContext } from "react";
import Typography from '@mui/material/Typography';
import {
          Dialog,
          DialogActions,
          DialogContent,
          DialogTitle,
        } from '@mui/material'
import { EditableContent } from '../index';
import AuthContext from "../../store/AuthContext";
import { UpdateTask } from '../../api'

function UpdateTaskForm ({ task, modalOpen, setModalOpen, setTask }){
  const authCtx = useContext(AuthContext)
  const handleClose = () => {
    setModalOpen(false)
  }
  const handleChangeTitle = (value) => {
    UpdateTask({
      task_id: task.id,
      token: authCtx.token,
      task: {
        title: value.trim()
      }
    }).then(res => setTask(res))
  }
  return (
    <Dialog open={modalOpen} onClose={handleClose}>
      <DialogTitle>
        <EditableContent submitEdit={handleChangeTitle}>
          <Typography
            variant="h6"
            noWrap
            component="p"
            sx={{
              padding: '5px',
              display: { md: 'flex' },
              color: '#173A5E',
              textDecoration: 'none',
              fontWeight:'bold',
              minWidth: '20rem',
              mb: 2,
              mt: 2,
            }}
          >
            {task.title}
          </Typography>
        </EditableContent>
      </DialogTitle>
    </Dialog>  
  )
}

export default UpdateTaskForm;