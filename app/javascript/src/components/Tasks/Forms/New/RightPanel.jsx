import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  Autocomplete,
  TextField,
  Typography,
  Divider,
  MenuItem
} from '@mui/material'
import styles from './Form.module.css'

const AUTO_COMPLETE = ['reporter_id', 'assignee_id']
const DATE_FIELD = ['start_date', 'end_date']

function RightPanel({ props, statuses, taskInput, setTaskProject }) {
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
    <FormControl className={styles['left-panel']} sx={{ m: 1, minWidth: 160 }} size="small">
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
    </FormControl>
  )
}

export default RightPanel;
