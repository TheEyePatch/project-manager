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

import { postProject } from '../../api/index'
import AuthContext from '../../store/AuthContext'
import ProjectContext from '../../store/ProjectContext';

function NewProjectForm({ modalOpen, setModalOpen, projectType, inProjectPage, page }) {
  const authCtx = useContext(AuthContext)
  const projectCtx = useContext(ProjectContext)
  const [projectInput, setProjectIntput] = useState({
    name: '',
    description: '',
    tag_prefix: '',
  })
  const [inputErrors, setInputErrors] = useState({
    name: {invalid: false, message: ''},
    description: {invalid: false, message: ''},
    tag_prefix: {invalid: false, message: ''}
  })

  const handleInput = (e) => {
    setProjectIntput((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value
      }
    })
  }

  const handleClose = () => {
    setModalOpen(false);
    setProjectIntput({
      name: '',
      description: '',
      tag_prefix: '',
    })

    setInputErrors({
      name: {invalid: false, message: ''},
      description: {invalid: false, message: ''},
      tag_prefix: {invalid: false, message: ''}
    })
  }

  const handleSubmit= () => {
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

      setModalOpen(false)
      setProjectIntput({ name: '', description: '', tag_prefix: '' })
    }).catch(res => {
      let errors = res.response.data.errors
      setInputErrors(prev => {
        let object = { ...prev }
        Object.entries(errors).forEach(entry => {
          let [key, value] = entry
          object[key].invalid = true
          object[key].message = value[0]
        })

        return object
      })
    })
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
          error={inputErrors.name.invalid}
          helperText={inputErrors.name.message}
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
          error={inputErrors.description.invalid}
          helperText={inputErrors.description.message}
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

        <TextField
          error={inputErrors.tag_prefix.invalid}
          helperText={inputErrors.tag_prefix.message}
          autoFocus
          margin="dense"
          id="tag_prefix"
          label="Prefix"
          value={projectInput.tag_prefix}
          onChange={handleInput}
          fullWidth
          variant="standard"
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