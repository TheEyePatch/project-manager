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
          Divider
        } from '@mui/material'
import { postTask, getProjectMembers } from '../../api';
import AuthContext from '../../store/AuthContext';
import BoardContext from '../../store/BoardContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../common/styles/EditableContent.css'

const AUTO_COMPLETE = ['reporter_id', 'assignee_id']
const DATE_FIELD = ['start_date', 'end_date']

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
    start_date: '',
    end_date: ''
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
    if(taskInput.title.length < 1) return setInputErrors({title: true})

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

  const handleDate = (e) => {
    setTaskProject(prev => {
      let field = e.currentTarget
      let dateTime = field.id == 'start_date' ? new Date(`${field.value} 00:00:00`) : new Date(`${field.value} 23:59:59`)

      return {
        ...prev, [field.id]: dateTime
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
      <div style={{ maxHeight: '40rem', display: 'flex', padding: '1rem'}}>
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
            <ReactQuill
              theme="snow"
              value={taskInput.description}
              onChange={(e) => setTaskProject(prev => {
                return {
                  ...prev,
                  description: e
                }
              })}
              error={inputErrors.description}
            />

          </DialogContent>
          <DialogActions style={{ marginTop: '1rem' }}>
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

            {
              AUTO_COMPLETE.map(component => {
                let label = component.replace('_id', '').replace(component[0], component[0].toUpperCase())

                return (
                  <Autocomplete
                    key={component} id={component} autoComplete includeInputInList
                    {...props}
                    sx={{ m: 1, minWidth: 160 }}
                    onChange={handleAutocomplete}
                    renderInput={(params) => <TextField {...params} label={label} variant="standard" />}
                  />
                )
              })
            }

            <Divider/>

            <div style={{ padding: '.5rem' }}>
            {
              DATE_FIELD.map(date => {
                let label =
                  date.replace('_', ' ')
                      .replace(date[0], date[0].toUpperCase())

                return (
                  <div key={date}>
                    <label>
                      <Typography variant="subtitle1" display="block" gutterBottom>
                        {label}
                      </Typography>
                    </label>
                    <input type="date" id={date} onChange={handleDate} style={{ padding: '.5rem', fontSize: '1rem' }}/>
                  </div>
                )
              })
            }
            </div>
          </FormControl>
        </div>
      </div>
    </Dialog>
  )
}

export default NewTaskForm
