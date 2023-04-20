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
          Select,
          Autocomplete,
        } from '@mui/material'
import { postTask, getProject, getProjectMembers } from '../../api';
import AuthContext from '../../store/AuthContext';
import BoardContext from '../../store/BoardContext';
import { TaskOutlined } from '@mui/icons-material';

function NewTaskForm({ modalOpen, setModalOpen, project_id }) {
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
    assignee_id: '',
    reporter_id: '',
  })
  const authCtx = useContext(AuthContext);
  const boardCtx = useContext(BoardContext)
  const [statuses, setStatuses] = useState([])
  const [props, setProps] = useState({
    options: [],
    getOptionLabel: (option) => option.account
  })

  useEffect(() => {
    if(boardCtx.boards.length > 0) setStatuses(boardCtx.boards)
    getProjectMembers({ params: { project_id: project_id }, token: authCtx.token })
    .then(res => 
        setProps(prev => {
          return {
            ...prev,
            options: [...res.participants, res.owner]
          }
        })
      )
  }, [modalOpen, project_id])

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
      return { ...prev, title: true}
    })
  }

  const handleClose = () => {
    setTaskProject({
      title: '',
      description: '',
      board_id: '',
      assignee_id: ''
    })

    setModalOpen(false)
  }

  const handleSubmit = () => {
    let params = { task: taskInput, project_id: project_id }
    postTask({params: params, token: authCtx.token})
    .then(res => {
      boardCtx.setBoards(oldBoard => {
        const newBoard = oldBoard.map(item => {
          if(item.id == res.task.board_id) item.tasks.push(res.task)

          return item
        })

        return newBoard
      })
    })

    setTaskProject({ title: '', description: '', board_id: '', assignee_id: '', reporter_id: ''})
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

  const handleAutocomplete = (e, value) => {
    if(!value) return

    let field = e.currentTarget.id.split('-')[0]
    setTaskProject(prev => {
      return {
        ...prev,
        [field]: value.id
      }
    })
  }
  return (
    <Dialog maxWidth={'md'} open={modalOpen} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h4" component="span" noWrap
            sx={{ display: { md: 'flex' },
              color: '#173A5E',
              textDecoration: 'none',
              fontWeight:'bold',
              minWidth: '25rem',
              mb: 2,
              mt: 2,}}
          >
            Create Task
        </Typography>
      </DialogTitle>
      <div style={{ maxHeight: '40rem', display: 'flex',}}>
        <div style={{ overflowY:  'auto', minWidth: '30rem',}}>
          <DialogContent>
            <TextField autoFocus id="title" margin="dense" label="Title" fullWidth variant="standard"
              error={inputErrors.title}
              helperText={inputErrors.title ? "Incorrect entry." : null}
              value={taskInput.title}
              onChange={handleInput}
            />

            <Typography
              noWrap
              sx={{ mt: 2, mb: 2, display: { md: 'flex' }, fontSize: '1rem',  fontWeight:'bold', color: 'F4F4F' }}>
              Description
            </Typography>
            <TextField fullWidth multiline margin="dense" id="description"
              error={inputErrors.description}
              helperText={inputErrors.description ? "Incorrect entry." : null}
              value={taskInput.description}
              onChange={handleInput}
              minRows={4}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </div>
        <div style={{ minWidth: '15rem'}}>
          <FormControl sx={{ m: 1, minWidth: 160 }} size="small">
            <InputLabel id="demo-select-small">Status</InputLabel>
            <Select
              labelId="demo-select-small"
              id="board_id"
              value={taskInput.board_id}
              label="Status"
              onChange={(e) => handleSelect(e, { field: 'board_id' })}
            >
              {
                statuses?.map(stat => {
                  return  <MenuItem  key={stat.id} data-name={'board_id'} value={stat.id}>{stat.title}</MenuItem>
                })
              }
            </Select>

            <Autocomplete id="reporter_id" autoComplete includeInputInList
              {...props}
              sx={{ m: 1, minWidth: 160 }}
              onChange={handleAutocomplete}
              renderInput={(params) => (
                <TextField {...params} label="Reporter" variant="standard" />
              )}
            />

            <Autocomplete id="assignee_id" autoComplete includeInputInList
              {...props} 
              sx={{ m: 1, minWidth: 160 }}
              onChange={handleAutocomplete}
              renderInput={(params) => (
                <TextField {...params} label="Assignee" variant="standard" />
              )}
            />
          </FormControl>
        </div>
      </div>
    </Dialog>
  )
}

export default NewTaskForm
