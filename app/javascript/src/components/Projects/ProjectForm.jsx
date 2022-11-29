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
import { BoardsTable } from './../index'
import AuthContext from '../../store/AuthContext'

function ProjectForm({ modalOpen, setModalOpen, setOwnedProjects }) {
  const authCtx = useContext(AuthContext)
  const [projectInput, setProjectIntput] = useState({
    name: '',
    description: '',
  })
  const [boards, setBoards] = useState([]); // TODO: ADD ARRAY OF BOARD INPUTS

  const handleInput = (e) => {
    setProjectIntput((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value
      }
    })
  }

  const handleBoardInput = (e) => {

  }

  const handleClose = () => setModalOpen(false);
  const handleSubmit= () => {
    postProject({ token: authCtx.token, inputs: projectInput })
    .then((res) => {
      setOwnedProjects(prev => [...prev, res.project])

      console.log(res.project)
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
          New Project
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

export default ProjectForm;