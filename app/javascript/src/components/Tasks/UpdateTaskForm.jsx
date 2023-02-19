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
import { EditableContent } from '../index';
import AuthContext from "../../store/AuthContext";
import { UpdateTask, getProject, getBoards } from '../../api'

function UpdateTaskForm ({ setBoards, task, modalOpen, setModalOpen, setTask }){
  const authCtx = useContext(AuthContext)
  const [statuses, setStatuses] = useState([])

  useEffect(() => {
    if(task.project_id == undefined) return

    getProject({
      token: authCtx.token,
      project_id: task.project_id,
    }).then(res => {
      if(res == undefined) return

      setStatuses(res.basic_board_info)
    })
  }, [task.project_id])

  const handleClose = () => {
    setModalOpen(false)
  }

  const handleChange = async ({value, attribute}) => {
    const taskUpdateResponse = await UpdateTask({
      task_id: task.id,
      token: authCtx.token,
      task: {
        [attribute]: String(value).trim()
      }
    })

    setTask(taskUpdateResponse)

    if(attribute == 'board_id' && task.board_id != value){
      const boardUpdateResponse = await getBoards({
        token: authCtx.token,
        project_id: task.project_id
      })

      setBoards(boardUpdateResponse)
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
          <EditableContent attribute={'description'} submitEdit={handleChange} cancelEdit={cancelEdit}>
            <Typography
              variant="p"
              component="p"
              sx={{
                textDecoration: 'none',
                minWidth: '15rem',
                maxWidth: '25rem',
                padding: '5px 10px 5px 10px',
                borderRadius: '5px',
                m: 2,
              }}
            >
              {task.description}
            </Typography>
          </EditableContent>
        </div>

        <div style={{ minWidth: '15rem'}}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Status</InputLabel>
            <Select
              labelId="demo-select-small"
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
        </div>
      </DialogContent>
    </Dialog>  
  )
}

export default UpdateTaskForm;