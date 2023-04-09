import React, { useState, useContext, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import {
          Button,
          Dialog,
          DialogActions,
          DialogContent,
          DialogTitle,
          TextField,
          MenuList,
          MenuItem,
        } from '@mui/material'
import { UserAvatar } from '../index'
import AuthContext from '../../store/AuthContext'
import { putProject, getProject } from '../../api'
import ProjectContext from '../../store/ProjectContext';

function UpdateProjectForm ({ modalOpen, setModalOpen, project_id }) {
  const authCtx = useContext(AuthContext)
  const projectCtx = useContext(ProjectContext)
  const [projectInput, setProjectIntput] = useState({
    name: '',
    description: ''
  })
  const [inputErrors, setInputErrors] = useState({
    name: {invalid: false, message: ''},
    description: {invalid: false, message: ''},
  })
  const [project, setProject] = useState({})

  useEffect(() => {
    getProject({project_id: project_id, token: authCtx.token})
    .then(res => {
      setProject(res.project)
      setProjectIntput({
        name: res.project.name,
        description: res.project.description
      })
    })
  }, [project_id])

  const handleInput = (e) => {
    setProjectIntput((prev) => {
      return { ...prev, [e.target.id]: e.target.value}
    })
  }

  const handleClose = () => {
    setModalOpen(false);
    setInputErrors({
      name: {invalid: false, message: ''},
      description: {invalid: false, message: ''}
    })
  }

  const handleSubmit = () => {
    let updatedProject = {
      project_id: project.id,
      ...projectInput
    }

    putProject({params: updatedProject, token: authCtx.token})
    .then(res => {
      projectCtx.setProjects(prev => {
        return prev.map(proj => {
          if(proj.id == res.project.id) return res.project

          return proj
        })
      })

      setModalOpen(false);
    }).catch(res => {
      let errors = res.response.data.errors
      setInputErrors(prev => {
        let obj = { ...prev }
        Object.entries(errors).forEach(entry => {
          let [key, value] = entry
          obj[key].invalid = true
          obj[key].message = value[0]
        })

        return obj
      })
    })
  }

  return (
    <Dialog open={modalOpen} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h4" noWrap component="span"
            sx={{
              mr: 2,
              display: { md: 'flex' },
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {project.name}
        </Typography>
      </DialogTitle>
      <DialogContent dividers={true} style={{ minHeight: '20rem', maxHeight: '40rem', display: 'flex',}}>
        <div style={{ minWidth: '15rem'}}>
          <TextField
            error={inputErrors.name.invalid}
            helperText={inputErrors.name.message }
            autoFocus margin="dense" id="name" label="Name" variant="standard"
            value={projectInput.name} onChange={handleInput}
            fullWidth
          />

          <TextField
            error={inputErrors.description.invalid}
            helperText={inputErrors.description.message}
            margin="dense" id="description" label="Description" variant="standard"
            value={projectInput.description} onChange={handleInput}
            fullWidth multiline minRows={4}
          />
        </div>
        <div style={{ minWidth: '15rem', paddingLeft: '1rem', display: 'flex', flexDirection: 'column'}}>
          {
            !!project?.owner && <>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Typography>Owner: </Typography>
                <div style={{ width: '50%',display: 'flex', alignItems: 'center', marginLeft: '1rem'}}>
                  <UserAvatar user={project.owner} height={'1.5rem'}/>
                  <Typography marginLeft={'1rem'}>{project.owner.account}</Typography>
                </div>
              </div>

              <div style={{marginTop: '1rem', overflowY: 'auto'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <Typography variant='h6'>Members</Typography>
                  <Button size='small' variant='contained'>Invite</Button>
                </div>
                <MenuList>
                  {
                    project.participants.map(user => {
                      return (
                      <MenuItem key={user.account}>
                        <UserAvatar user={user} height={'1.5rem'}/>
                        <Typography marginLeft={'1rem'}>{user.account}</Typography>
                      </MenuItem>
                      )
                    })
                  }
                </MenuList>
              </div>
            </>
          }
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateProjectForm;