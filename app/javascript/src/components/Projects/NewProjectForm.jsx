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

const PROJ_NAME_MIN_LEN = 4
function NewProjectForm({ modalOpen, setModalOpen, setOwnedProjects }) {
  const authCtx = useContext(AuthContext)
  const [projectInput, setProjectIntput] = useState({
    name: '',
    description: '',
  })
  const [boards, setBoards] = useState([]); // TODO: ADD ARRAY OF BOARD INPUTS
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
      setOwnedProjects(prev => [...prev, res.project])

      postMultipleBoards({ 
        project_id: res.project.id,
        boards: boards,
        token: authCtx.token
       })
    }) // TO DO: POST BOARD INPUTS AFTER PROJECT IS SUCCESSFULLY CREATED

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