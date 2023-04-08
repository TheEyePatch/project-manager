import React, { useState, useContext } from 'react';
import Typography from '@mui/material/Typography';
import {
          Button,
          Dialog,
          DialogActions,
          DialogContent,
          DialogTitle,
          TextField
        } from '@mui/material'

import { postProject, postMultipleBoards } from '../../api/index'
import { BoardsTable } from '../index'
import AuthContext from '../../store/AuthContext'
import ProjectContext from '../../store/ProjectContext';
import UserContext from '../../store/UserContext';

const PROJ_NAME_MIN_LEN = 4
function NewProjectForm({ modalOpen, setModalOpen, projectType, inProjectPage, page }) {
  const authCtx = useContext(AuthContext)
  const userCtx =useContext(UserContext)
  const projectCtx = useContext(ProjectContext)
  const [projectInput, setProjectIntput] = useState({
    name: '',
    description: '',
  })
  const [inputErrors, setInputErrors] = useState({
    name: false,
    description: false,
  })

  const handleInputErrors = () => {
    setInputErrors(prev => {
      return {
        ...prev,
        name: true
      }
    })
  }

  const handleInput = (e) => {
    setProjectIntput((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value
      }
    })

    setInputErrors(prev => {
      return {
        ...prev,
        [e.target.id]: false
      }
    })
  }

  const handleClose = () => {
    setModalOpen(false);
    setProjectIntput({
      name: '',
      description: '',
    })
    setInputErrors({
      name: false,
      description: false,
    })
  }

  const handleSubmit= () => {
    if (projectInput.name.length < PROJ_NAME_MIN_LEN) return handleInputErrors()

    postProject({ token: authCtx.token, inputs: projectInput })
    .then((res) => {
      if(!inProjectPage || page != 1) return
      projectCtx.setProjects(prev => {
        if (projectType === 'owned') {
          prev.pop()
          return [res.project, ...prev]
        }

        return prev
      })
    })

    setProjectIntput({
      name: '',
      description: ''
    })

    setModalOpen(false)
  }

  return(
  <Dialog open={modalOpen} onClose={handleClose}>
    <DialogTitle>
      <Typography
          variant="h6"
          noWrap
          component="span"
          sx={{
            mb: 2,
            display: { md: 'flex' },
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          New Project
      </Typography>
    </DialogTitle>
    <DialogContent>
      <TextField
        error={inputErrors.name}
        helperText={inputErrors.name ? "Incorrect entry." : null}
        autoFocus
        margin="dense"
        id="name"
        label="Name"
        value={projectInput.name}
        onChange={handleInput}
        fullWidth
        variant="standard"
      />

      <TextField
        error={inputErrors.description}
        helperText={inputErrors.description ? "Incorrect entry." : null}
        margin="dense"
        id="description"
        label="Description"
        value={projectInput.description}
        onChange={handleInput}
        fullWidth
        variant="standard"
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

export default NewProjectForm;