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
import { updateBoard } from '../../api';
import AuthContext from '../../store/AuthContext'

function UpdateBoardForm ({ board, modalOpen, setModalOpen, setCurrentBoard }) {
  const [boardInput, setBoardInput] = useState({
    title: board.title
  })
  const authCtx = useContext(AuthContext);
  const token = authCtx.token

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

    updateBoard({
      token: token,
      board_id: board.id,
      board: {
        title: boardInput.title,
      }
    }).then(res => setCurrentBoard(res))
    setModalOpen(false)
  }
  return (
    <Dialog open={modalOpen} onClose={handleClose}>
      <DialogTitle
        sx={{minWidth: '25rem',}}
      >
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