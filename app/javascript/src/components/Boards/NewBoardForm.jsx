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
import { postBoards } from '../../api'

function NewBoardForm ({ modalOpen, setModalOpen, setBoards, project_id, token }) {
  const [boardInput, setBoardInput] = useState({
    title: '',
    position: '',
  })

  const [inputError, setInputError] = useState({ title: false })

  const handleInput = (e) => {
    setBoardInput(prev => {
      return {
        ...prev,
        [e.target.id]: e.target.value
      }
    })
    setInputError(false)
  }
  const handleClose = () =>{
    setBoardInput({
      title: '',
      position: '',
    })
    setModalOpen(false)
  }
  const handleSubmit = () => {
    if(boardInput.title.length < 1) return setInputError({ title: true })

    postBoards({
      token: token,
      project_id: project_id,
      board: {
        title: boardInput.title,
      }
    }).then(res => {
      setBoards(boards => {
        const newBoard = [...boards, res]

        return newBoard.sort((a, b) => a.position - b.position)
      })
    })

    setBoardInput({
      title: '',
      position: '',
    })
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
            Create Board
        </Typography>
        <TextField
            error={inputError.title}
            helperText={inputError.title ? "Title required" : null}
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            value={boardInput.title}
            onChange={handleInput}
            fullWidth
            variant="standard"
          />
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewBoardForm;