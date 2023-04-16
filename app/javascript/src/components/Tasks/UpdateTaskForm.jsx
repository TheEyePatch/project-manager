import React, { useState, useContext, useEffect } from "react";
import Typography from '@mui/material/Typography';
import {
          Dialog,
          DialogActions,
          DialogContent,
          DialogTitle,
          InputLabel,
          MenuItem,
          FormControl,
          Select
        } from '@mui/material'
import { EditableContent, EditableContentV2 } from '../index';
import AuthContext from "../../store/AuthContext";
import { UpdateTask, getProject, getBoards } from '../../api'
import BoardContext from "../../store/BoardContext";

function UpdateTaskForm ({ task, modalOpen, setModalOpen, setTask }){
  const authCtx = useContext(AuthContext)
  const boardCtx = useContext(BoardContext)
  const [statuses, setStatuses] = useState([])

  useEffect(() => {
    setStatuses(boardCtx.boards)  
  }, [task.id])

  const handleClose = () => {
    setModalOpen(false)
  }

  const handleChange = async ({value, attribute}) => {
    let params = {task: { [attribute]: String(value)},  task_id: task.id }
    const taskUpdateResponse = await UpdateTask({
      params: params,
      token: authCtx.token,
    })

    setTask(taskUpdateResponse)

    if(attribute == 'board_id' || attribute == 'position'){
      const boardUpdateResponse = await boardCtx.fetchBoards()
      boardCtx.setBoards(boardUpdateResponse)
    }
  }

  const cancelEdit = ({value, attribute}) => {
    // Causes the title to r-render
    setTask(task)
  }

  return (
    <Dialog maxWidth={'md'} scroll={'paper'} open={modalOpen} onClose={handleClose}>
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
            {task.title}
          </Typography>
        </EditableContent>
      </DialogTitle>
      <DialogContent dividers={true} style={{ maxHeight: '40rem', display: 'flex',}}>
        <div>
          <Typography
            variant="h6"
            component="p"
            sx={{
              padding: '5px',
              display: { md: 'flex' },
              color: '#173A5E',
              textDecoration: 'none',
              fontWeight:'bold',
              minWidth: '20rem',
              borderBottom: '1px solid rgb(105,105,105)',
              marginX: 3,
            }}
          >
            Description
          </Typography>

          <EditableContentV2 
            innerHTML={task.description}
            attribute={'description'} submitEdit={handleChange} cancelEdit={cancelEdit}
            style={{
              textDecoration: 'none',
              minWidth: '15rem',
              maxWidth: '30rem',
              padding: '5px 5px 5px 5px',
              borderRadius: '5px',
              margin: '10px',
              marginLeft: '15px',
              overflowY: 'hidden',
              fontFamily: 'Arial, Helvetica, sans-serif',
            }}
          />
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
        </div>
      </DialogContent>
    </Dialog>  
  )
}

export default UpdateTaskForm;