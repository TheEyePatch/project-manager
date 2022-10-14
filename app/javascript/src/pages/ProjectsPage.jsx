import React, { useState } from "react";
import { Button, Container, Modal, Box, Typography } from '@mui/material';
import { Projects } from './../components/index';

function ProjectsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const handleNewProject = () => { setModalOpen(true) }
  const handleClose = () => { setModalOpen(false) }
  
  return (
    <Container>
    <section style={{
      paddingTop: '1rem',
      paddingTop: '1rem'
    }}>
      <div style={{ 
        margin: '1rem 0 1rem',
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <Button variant="contained" size="large" onClick={handleNewProject}>
          New Project
        </Button>

        <Modal
          open={modalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <Box style={{ width: '100px', backgroundColor: 'white' }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      </div>
      <Projects/>
    </section>
  </Container>
  )
}


export default ProjectsPage;