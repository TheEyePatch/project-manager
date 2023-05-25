import React, { useState, useContext, useEffect } from "react";
import Typography from '@mui/material/Typography';
import {
          Dialog,
          DialogContent,
          DialogTitle,
          InputLabel,
          MenuItem,
          FormControl,
          Select,
          TextField,
          Autocomplete,
        } from '@mui/material'
import { EditableContent, EditableContentV2, NewComment } from '../index';
import AuthContext from "../../store/AuthContext";
import UserContext from "../../store/UserContext";
import { UpdateTask, attachTaskImages } from '../../api'
import BoardContext from "../../store/BoardContext";

function UpdateTaskForm ({ task, modalOpen, setModalOpen, setTask }){
  const authCtx = useContext(AuthContext)
  const boardCtx = useContext(BoardContext)
  const userCtx = useContext(UserContext)
  const [statuses, setStatuses] = useState([])
  const [refetchOnClose, setRefetchOnClose] = useState(false)
  const props = {
    options: userCtx.projectMembers,
    getOptionLabel: (option) => option.account
  }

  useEffect(() => {
    setStatuses(boardCtx.boards)
  }, [task.id])

  const handleClose = () => {
    if(refetchOnClose) {
      boardCtx.fetchBoards()
      .then(res => boardCtx.setBoards(res))
    }
    setModalOpen(false)
  }

  const handleChange = async ({value, attribute}) => {
    let params = {task: { [attribute]: String(value)},  task_id: task.id }
    console.log(params)
    const updateResponse = await UpdateTask({
      params: params,
      token: authCtx.token,
    })

    setTask(updateResponse.task)
    if(attribute == 'board_id' || attribute == 'position') setRefetchOnClose(true)
  }

  const cancelEdit = ({value, attribute}) => {
    // Causes the title to r-render
    setTask(task)
  }

  const attachmentCallback = async (fileData) => {
    let formData = new FormData()
    formData.append('image', fileData, fileData.name)
    const updateTaskResponse = await attachTaskImages({
      data: formData,
      token: authCtx.token,
      task_id: task.id
    })

    return updateTaskResponse
  }

  return (
    <Dialog maxWidth={'lg'} scroll={'paper'} open={modalOpen} onClose={handleClose}>
      <DialogTitle>
        <EditableContent attribute={'title'} submitEdit={handleChange} cancelEdit={cancelEdit}>
          <Typography
            variant="h4"
            component="p"
            sx={{
              padding: '5px',
              display: { md: 'flex' },
              color: '#173A5E',
              textDecoration: 'none',
              fontWeight:'bold',
              minWidth: '20rem',
              borderBottom: '2px solid rgb(105,105,105)',
            }}
          >
            {task?.title}
          </Typography>
        </EditableContent>
      </DialogTitle>
      <DialogContent dividers={true} style={{ maxHeight: '90vh', display: 'flex',}}>
        <div style={{ overflowY: 'auto'}}>
          <Typography
            variant="h6"
            component="p"
            sx={{
              padding: '5px',
              display: { md: 'flex' },
              color: '#173A5E',
              textDecoration: 'none',
              fontWeight:'bold',
              minWidth: '30rem',
              borderBottom: '1px solid rgb(105,105,105)',
              marginX: 3,
            }}
          >
            Description
          </Typography>

          <EditableContentV2 
            innerHTML={task.description}
            attachmentCallback={attachmentCallback}
            attribute={'description'} submitEdit={handleChange} cancelEdit={cancelEdit}
            style={{
              textDecoration: 'none',
              minWidth: '15rem',
              maxWidth: '30rem',
              padding: '5px',
              borderRadius: '5px',
              margin: '10px',
              marginLeft: '15px',
              overflowY: 'hidden',
              minHeight: '10rem',
            }}
          />

        <div style={{ maxHeight: '20rem', overflowY: 'auto' }}>
          <Typography
            variant="h6"
            component="p"
            sx={{
              padding: '5px',
              display: { md: 'flex' },
              color: '#173A5E',
              textDecoration: 'none',
              fontWeight:'bold',
              minWidth: '30rem',
              borderBottom: '1px solid rgb(105,105,105)',
              marginX: 3,
            }}
          >
            Comments
          </Typography>
          <NewComment task_id={task.id} />
        </div>
        </div>

        <div style={{ minWidth: '15rem'}}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="task-status-select">Status</InputLabel>
            <Select
              labelId="status-select"
              value={task?.board_id}
              id="board_id"
              label={"Status"}
              onChange={(e) => handleChange({ value: e.target.value, attribute: 'board_id' })}
            > 
              {
                statuses.map(stat => {
                  return  <MenuItem  key={stat.id} value={stat.id}>{stat.title}</MenuItem>
                })
              }
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="task-position-select">Position</InputLabel>
            <Select
              labelId="task-position-select"
              value={task?.position}
              id="position"
              label={"Position"}
              onChange={(e) => handleChange({ value: e.target.value, attribute: 'position' })}
            > 
              {
                task?.positions.map(position => {
                  return  <MenuItem  key={position} value={position}>{position}</MenuItem>
                })
              }
            </Select>
          </FormControl>

          <Autocomplete id="reporter_id" autoComplete includeInputInList
            {...props}
            sx={{ m: 1, minWidth: 160 }}
            onChange={(e, val) => handleChange({value: val.id, attribute: 'reporter_id'})}
            value={task.reporter}
            renderInput={(params) => (
              <TextField {...params} label="Reporter" variant="standard" />
            )}
          />

          <Autocomplete id="assignee_id" autoComplete includeInputInList
            {...props} 
            sx={{ m: 1, minWidth: 160 }}
            onChange={(e, val) => handleChange({value: val.id, attribute: 'assignee_id'})}
            value={task.assignee}
            renderInput={(params) => (
              <TextField {...params} label="Assignee" variant="standard" />
            )}
          />
        </div>
      </DialogContent>
    </Dialog>  
  )
}

export default UpdateTaskForm;