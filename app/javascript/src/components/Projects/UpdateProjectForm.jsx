import React, { useState, useContext, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import {
          Button,
          Dialog,
          DialogActions,
          DialogContent,
          DialogTitle,
          TextField
        } from '@mui/material'
import { BoardsTable } from '../index'
import AuthContext from '../../store/AuthContext'
import { putProject, getBoards } from '../../api'

function UpdateProjectForm ({ modalOpen, setModalOpen, project, setCurrentProject }) {
  const authCtx = useContext(AuthContext)
  const [projectInput, setProjectIntput] = useState({
    name: project.name,
    description: project.description,
  })
  const [boards, setBoards] = useState([]); // TODO: ADD ARRAY OF BOARD INPUTS
  const [inputErrors, setInputErrors] = useState({
    name: false,
    description: false,
  })

  useEffect(() => {
    getBoards({token: authCtx.token, project_id: project.id})
    .then(res => {
      setBoards(res)
    })
  }, [project])

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

  const handleInputErrors = () => {
    if(projectInput.name < 4){
      setInputErrors(prev => {
        return {
          ...prev,
          name: true
        }
      })
    }
  }

  const handleClose = () => {
    setModalOpen(false);
    setProjectIntput({
      name: project.name,
      description: project.description,
    })

    setInputErrors({
      name: false,
      description: false,
    })
  }

  const handleSubmit = () => {
    // putProject(projectInput)

    if(projectInput.name.length < 4) {
      handleInputErrors()

      return
    }

    let updatedProject = {
      project_id: project.id,
      project: projectInput,
      boards: boards
    }

    putProject(updatedProject)
    .then(res => {
      setCurrentProject(res)
    })

    setModalOpen(false);
  }

  return (
    <Dialog open={modalOpen} onClose={handleClose}>
      <DialogTitle>
        <Typography
            variant="h4"
            noWrap
            component="span"
            sx={{
              mr: 2,
              display: { md: 'flex' },
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {project.name}
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

        <BoardsTable boards={boards} setBoards={setBoards}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateProjectForm;