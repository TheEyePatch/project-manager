import React, { useState } from "react";
import { Button, Container } from '@mui/material';
import { Projects, ProjectForm } from './../components/index';

function ProjectsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const handleNewProject = () => setModalOpen(true);

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
        <ProjectForm modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </div>
      <Projects/>
    </section>
  </Container>
  )
}


export default ProjectsPage;