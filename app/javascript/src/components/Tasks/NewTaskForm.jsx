import React, { useEffect, useState, useContext } from 'react';
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
import { postTask, getProject } from '../../api';
import AuthContext from '../../store/AuthContext';
import BoardContext from '../../store/BoardContext';

function NewTaskForm({ modalOpen, setModalOpen, project_id, token }) {
  //  Hooks
  const [inputErrors, setInputErrors] = useState({
    title: false,
    description: false,
  })
  const [taskInput, setTaskProject] = useState({
    title: '',
    description: '',
    board_id: '',
    position: '',
  })
  const authCtx = useContext(AuthContext);
  const boardCtx = useContext(BoardContext)
  const [statuses, setStatuses] = useState([])

  useEffect(() => {
    getProject({
      token: authCtx.token,
      project_id: project_id,
    }).then(res => {
      if(res == undefined) return

      setStatuses(res.basic_board_info)
    })
  }, [modalOpen])

  // Methods
  const handleInput = (e) => {
    setInputErrors(prev => {
      return {
        ...prev,
        [e.target.id]: false,
      }
    })
    setTaskProject(prev => {
      return {
        ...prev,
        [e.target.id]: e.target.value
      }
    })
  }
  const handleInputErrors = () => {
    setInputErrors(prev => {
      return {
        ...prev,
        title: true,
      }
    })
  }
  const handleClose = () => {
    setTaskProject({
      title: '',
      description: '',
      board_id: ''
    })

    setModalOpen(false)
  }
  const handleSubmit = () => {
    if(taskInput.title.length < 4) return handleInputErrors()

    postTask({
      task: taskInput,
      project_id: project_id,
      token: token,
    })
    .then(res => {
      boardCtx.setBoards(oldBoard => {
        const newBoard = oldBoard.map(item => {
          if(item.id == res.board_id){
            item.tasks.push(res)
          }

          return item
        })

        return newBoard
      })
    })

    setTaskProject({
      title: '',
      description: '',
      board_id: ''
    })
    setModalOpen(false)
  }
  const handleSelect = (e, object) => {
    setTaskProject(prev => {
      return {
        ...prev,
        [object.field]: e.target.value,

      }
    })
  }
  return (
    <Dialog maxWidth={'md'} open={modalOpen} onClose={handleClose}>
      <DialogTitle>
        <Typography
            variant="h4"
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
            Create Task
        </Typography>
      </DialogTitle>
      <div style={{ maxHeight: '40rem', display: 'flex',}}>
        <div style={{ overflowY:  'auto', minWidth: '30rem',}}>
          <DialogContent>
            <TextField
              error={inputErrors.title}
              helperText={inputErrors.title ? "Incorrect entry." : null}
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              value={taskInput.title}
              onChange={handleInput}
              fullWidth
              variant="standard"
            />

            <Typography
              noWrap
              sx={{
                mt: 2,
                mb: 2,
                display: { md: 'flex' },
                // color: '#173A5E',
                fontSize: '1rem',
                fontWeight:'bold',
                color: 'F4F4F'
              }}
            >
              Description
            </Typography>
            <TextField
              error={inputErrors.description}
              helperText={inputErrors.description ? "Incorrect entry." : null}
              margin="dense"
              id="description"
              value={taskInput.description}
              onChange={handleInput}
              fullWidth
              multiline
              minRows={4}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </div>
        <div style={{ minWidth: '15rem'}}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Status</InputLabel>
            <Select
              labelId="demo-select-small"
              id="board_id"
              value={taskInput.board_id}
              label="Status"
              onChange={(e) => handleSelect(e, { field: 'board_id' })}
            >
              {
                statuses.map(stat => {
                  return  <MenuItem  key={stat.id} data-name={'board_id'} value={stat.id}>{stat.title}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </div>
      </div>
    </Dialog>
  )
}

export default NewTaskForm
