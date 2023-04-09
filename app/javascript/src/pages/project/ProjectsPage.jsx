import React, { useContext, useState } from 'react'
import { Projects } from '../../components';
import { NewProjectForm } from '../../components/index'
import Grid from '@mui/material/Grid';
import { Button, Container, Tabs, Tab } from '@mui/material';
import AuthContext from '../../store/AuthContext'
import { ProjectContextProvider } from '../../store/ProjectContext'

const PROJECT_TYPES = {
  'owned': 'Owned Projects',
  'participated': 'Participated Projects'
}
function ProjectsPage () {
  const authCtx = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false)
  const [projectType, setProjectType] = useState('owned')
  const handleChange = (_e, newVal) => setProjectType(newVal)
  const [page, setPage] = useState(1)

  return (
    <ProjectContextProvider>
      <section style={{ overflowY: 'auto', boxSizing: 'border-box', paddingTop: '5rem', width: '100vw', height: '100vh',backgroundColor: '#FDF5E6'}}>
        <Container>
          <div style={{ 
            margin: '1rem 0 1rem',
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <Button variant="contained" size="large" onClick={() => setModalOpen(true)}>
              New Project
            </Button>
            <NewProjectForm
              setModalOpen={setModalOpen}
              modalOpen={modalOpen}
              projectType={projectType}
              page={page}
              inProjectPage
            />
          </div>
          <Tabs value={projectType} onChange={handleChange}>
            {
              Object.keys(PROJECT_TYPES).map(type => {
                return <Tab sx={{
                  fontSize: '1.2rem',
                  fontWeight: '800'
                }} key={type} wrapped value={type} label={PROJECT_TYPES[type]} />
              })
            }
          </Tabs>

          <Projects
            projectType={projectType}
            token={authCtx.token}
            page={page}
            setPage={setPage}
          />
        </Container>
      </section>
    </ProjectContextProvider> 
  )
}

export default ProjectsPage;
