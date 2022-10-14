import React from 'react';
import {
          Button,
          Dialog,
          DialogActions,
          DialogContent,
          DialogContentText,
          DialogTitle,
          TextField
        } from '@mui/material'

function ProjectForm({ modalOpen, setModalOpen }) {
  const handleClose = () => setModalOpen(false);
  const handleSubmit= () => console.log('submit!');

  return(
  <Dialog open={modalOpen} onClose={handleClose}>
    <DialogTitle>
      New Project
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        Create New Project
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Name"
        fullWidth
        variant="standard"
      />

      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Description"
        fullWidth
        variant="standard"
        multiline
        minRows={4}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleSubmit}>Submit</Button>
    </DialogActions>
  </Dialog>
  )
}

export default ProjectForm;