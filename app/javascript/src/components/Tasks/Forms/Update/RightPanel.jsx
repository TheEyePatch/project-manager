import React, { useState, useEffect, useContext } from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Autocomplete,
  Divider,
  Typography
} from '@mui/material'
import BoardContext from "../../../../store/BoardContext";
import UserContext from "../../../../store/UserContext";
import styles from './Form.module.css'
import { UpdateTask } from '../../../../api'
import AuthContext from "../../../../store/AuthContext";

const DATE_FIELD = ['start_date', 'end_date']
const USER_FIELD = ['reporter_id','assignee_id']

function RightPanel({ task, setTask, handleChange }) {
  const [statuses, setStatuses] = useState([])
  const authCtx = useContext(AuthContext)
  const boardCtx = useContext(BoardContext)
  const userCtx = useContext(UserContext)
  const props = {
    options: userCtx.projectMembers,
    getOptionLabel: (option) => option.account
  }

  useEffect(() => {
    if(!task.id) return

    setStatuses(boardCtx.boards)

    DATE_FIELD.forEach(date =>{
      if(!task[date]) return

      document.getElementById(date).valueAsDate =  new Date(task[date])
    })
  }, [task.id])

  const handleDate = (e) => {
    let field = e.currentTarget
    let dateTime = field.id == 'start_date' ? new Date(field.value) : new Date(field.value)

    console.log(task.start_date)
    UpdateTask({
      token: authCtx.token,
      params: { 
        task_id: task.id,
        [field.id]: dateTime
       }
    }).then(res => {
      setTask(res.task)
    })
  }
  return (
    <>
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

      {
        USER_FIELD.map(user => {
          let label = user.replace('_id', '').replace(user[0], user[0].toUpperCase())
          return (
            <Autocomplete id={user} autoComplete includeInputInList
              {...props}
              sx={{ m: 1, minWidth: 160 }}
              onChange={(e, val) => handleChange({value: val.id, attribute: user})}
              value={task.reporter}
              renderInput={(params) => (
                <TextField {...params} label={label} variant="standard" />
              )}
            />
          )
        })
      }

      <Divider/>

      <div className={styles['date-field-container']}>
        {
          DATE_FIELD.map(date => {
            let label =
              date.replace('_', ' ')
                  .replace(date[0], date[0].toUpperCase())

            return (
              <div className={styles[`${date}-field`]} key={date}>
                <label>
                  <Typography variant="subtitle1" display="block" gutterBottom>
                    {label}
                  </Typography>
                </label>
                <input type="date" id={date} onChange={handleDate}/>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default RightPanel;
