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

function UpdateProjectForm ({ modalOpen, setModalOpen, project }) {
  const authCtx = useContext(AuthContext)
  const [projectInput, setProjectIntput] = useState({
    name: project.name,
    description: project.description,
  })
  const [boards, setBoards] = useState([]); // TODO: ADD ARRAY OF BOARD INPUTS
  const [projectUpdate, setprojectUpdate] = useState(project)

  useEffect(() => {
    getBoards({token: authCtx.token, project_id: projectUpdate.id})
    .then(res => {
      setBoards(res)
    })
  }, [projectUpdate])

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
    })
  }

  const handleSubmit = () => {
    // putProject(projectInput)

    let updatedProject = {
      project_id: projectUpdate.id,
      project: projectInput,
      boards: boards
    }
    console.log(updatedProject)
    putProject(updatedProject)
    .then(res => {
      setprojectUpdate(res)
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
            {projectUpdate.name}
        </Typography>
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