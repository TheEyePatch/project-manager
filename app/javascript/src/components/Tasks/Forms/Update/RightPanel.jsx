import React, { useState, useEffect, useContext } from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Autocomplete,
} from '@mui/material'
import BoardContext from "../../../../store/BoardContext";
import UserContext from "../../../../store/UserContext";

function RightPanel({ task, handleChange }) {
  const [statuses, setStatuses] = useState([])
  const boardCtx = useContext(BoardContext)
  const userCtx = useContext(UserContext)
  const props = {
    options: userCtx.projectMembers,
    getOptionLabel: (option) => option.account
  }

  useEffect(() => {
    setStatuses(boardCtx.boards)
  }, [task.id])

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
    </>
  )
}

export default RightPanel;
