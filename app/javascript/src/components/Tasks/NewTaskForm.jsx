import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import {
          Button,
          Dialog,
          DialogActions,
          DialogContent,
          DialogTitle,
          TextField
        } from '@mui/material'
import { postTask } from '../../api';

function NewTaskForm({ modalOpen, setModalOpen, project_id, token }) {
  const [inputErrors, setInputErrors] = useState({
    title: false,
    description: false,
  })
  const [taskInput, setTaskProject] = useState({
    title: '',
    description: ''
  })
  const handleInput = (e) => {
    setInputErrors(prev => {
      return {
        ...prev,
        [e.target.id]: false,
      }
    })
    setTaskProject(prev => {
      return {
        ...prev,
        [e.target.id]: e.target.value
      }
    })
  }
  const handleInputErrors = () => {
    setInputErrors(prev => {
      return {
        ...prev,
        title: true,
      }
    })
  }
  const handleClose = () => {
    setTaskProject(prev => {
      return {
        title: '',
        description: ''
      }
    })

    setModalOpen(false)
  }
  const handleSubmit = () => {
    if(taskInput.title.length < 4) return handleInputErrors()

    postTask({
      task: taskInput,
      project_id: project_id,
      token: token,
    })
    .then(res => console.log(res))
    setModalOpen(false)
  }
  return (
    <Dialog open={modalOpen} onClose={handleClose}>
      <DialogTitle>
        <Typography
            variant="h6"
            noWrap
            component="span"
            sx={{
              display: { md: 'flex' },
              color: '#173A5E',
              textDecoration: 'none',
              fontWeight:'bold',
              minWidth: '25rem',
              mb: 2,
              mt: 2,
            }}
          >
            Create Task
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          error={inputErrors.title}
          helperText={inputErrors.title ? "Incorrect entry." : null}
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          value={taskInput.title}
          onChange={handleInput}
          fullWidth
          variant="standard"
        />

        <Typography
          noWrap
          sx={{
            mt: 2,
            mb: 2,
            display: { md: 'flex' },
            color: '#173A5E',
            fontSize: '1rem',
            fontWeight:'bold',
            color: 'F4F4F'
          }}
        >
          Description
        </Typography>
        <TextField
          error={inputErrors.description}
          helperText={inputErrors.description ? "Incorrect entry." : null}
          margin="dense"
          id="description"
          value={taskInput.description}
          onChange={handleInput}
          fullWidth
          multiline
          minRows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewTaskForm