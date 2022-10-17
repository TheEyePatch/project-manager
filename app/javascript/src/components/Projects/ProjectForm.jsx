import React, { useState, useContext } from 'react';
import {
          Button,
          Dialog,
          DialogActions,
          DialogContent,
          DialogTitle,
          TextField
        } from '@mui/material'

import { postProject } from '../../api/index'
import AuthContext from '../../store/AuthContext'

function ProjectForm({ modalOpen, setModalOpen, setProjects }) {
  const [projectInput, setProjectIntput] = useState({
    name: '',
    description: '',
  })

  const handleInput = (e) => {
    setProjectIntput((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value
      }
    })
  }

  const handleClose = () => setModalOpen(false);

  const authCtx = useContext(AuthContext)
  const handleSubmit= () => {
    postProject({ token: authCtx.token, inputs: projectInput })
    .then((res) => setProjects(prev => [...prev, res.project]));

    setProjectIntput({
      name: '',
      description: ''
    })

    setModalOpen(false)
  }

  return(
  <Dialog open={modalOpen} onClose={handleClose}>
    <DialogTitle>
      New Project
    </DialogTitle>
    <DialogContent>
      <TextField
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
        autoFocus
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

export default ProjectForm;