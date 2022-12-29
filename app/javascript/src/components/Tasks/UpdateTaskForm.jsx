import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import {
          Button,
          Dialog,
          DialogActions,
          DialogContent,
          DialogTitle,
          TextField
        } from '@mui/material'

function UpdateTaskForm ({ task, modalOpen, setModalOpen }){
  const handleClose = () => {
    setModalOpen(false)
  }
  return (
    <Dialog open={modalOpen} onClose={handleClose}>
      <DialogTitle>
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { md: 'flex' },
              color: '#173A5E',
              textDecoration: 'none',
              fontWeight:'bold',
              minWidth: '20rem',
              mb: 2,
              mt: 2,
            }}
          >
            {task.title}
        </Typography>
      </DialogTitle>
    </Dialog>  
  )
}

export default UpdateTaskForm;