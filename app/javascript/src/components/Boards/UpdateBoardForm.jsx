import React, { useState, useContext, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import {
          Button,
          Dialog,
          DialogActions,
          DialogContent,
          DialogTitle,
          TextField,
          InputLabel,
          MenuItem,
          FormControl,
          Select
        } from '@mui/material'
import { updateBoard, getBoard } from '../../api';
import AuthContext from '../../store/AuthContext'

function UpdateBoardForm ({ board, modalOpen, setModalOpen, setCurrentBoard }) {
  const [boardInput, setBoardInput] = useState({
    title: board.title,
    position: board.position,
  })
  const authCtx = useContext(AuthContext);
  const [inputError, setInputError] = useState({ title: false })
  const [boardPositions, setBoardPositions] = useState([])
  const token = authCtx.token

  useEffect(()  => {
    let params = { board_id: board.id, project_id: board.project_id }
    getBoard({ params: params, token: token }).then(res => {
      setBoardPositions(res.board_positions)
    })
  }, [])

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
  const handleSubmit = async () => {
    if(boardInput.title.length < 1) {
      return setInputError({ title: true })
    }
    let boardUpdateResponse = await updateBoard({
      token: token,
      board_id: board.id,
      board: {
        title: boardInput.title,
        position: boardInput.position,
      }
    })
    setCurrentBoard(boardUpdateResponse)

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
        <FormControl style={{ minWidth: '5rem', marginTop: '15px'}}>
          <InputLabel id="board-position-select">Position</InputLabel>
            <Select
              labelId="task-position-select"
              value={boardInput?.position}
              id="position"
              label={"Position"}
              onChange={(e) => handleInput({ target: { id: 'position', value: e.target.value }})}
            > 
              {
                boardPositions.map(position => {
                  return  <MenuItem  key={position} value={position}>{position}</MenuItem>
                })
              }
            </Select>
        </FormControl>
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateBoardForm;