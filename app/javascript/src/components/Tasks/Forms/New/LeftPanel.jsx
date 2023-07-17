import React, { useState } from "react";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import {
  Typography, TextField, DialogContent

} from '@mui/material'
import styles from './Form.module.css'

function LeftPanel({ taskInput, setTaskProject}) {
  const [inputErrors, setInputErrors] = useState({
    title: false,
    description: false,
  })

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

  return (
    <DialogContent className={styles['left-panel']}>
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
  )
}

export default LeftPanel;
