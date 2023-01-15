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

function UpdateBoardForm ({ board, modalOpen, setModalOpen }) {
  const [boardInput, setBoardInput] = useState({
    title: boardInput.title
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
    setModalOpen(false)
  }
  const handleSubmit = () => {
    if(boardInput.title.length < 1) {
      return setInputError({ title: true })
    }

    console.log('submitted')
  }
  return (
    <Dialog open={modalOpen} onClose={handleClose}>
      <DialogTitle>
        <TextField
            error={inputError.title}
            helperText={inputError.title ? "Incorrect entry." : null}
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

export default UpdateBoardForm;