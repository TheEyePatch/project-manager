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
          Popover,
          Snackbar,
          Alert
        } from '@mui/material'
import { UserAvatar } from '../index'
import AuthContext from '../../store/AuthContext'
import { putProject, getProject, inviteProjectUser } from '../../api'
import ProjectContext from '../../store/ProjectContext';
import UserContext from '../../store/UserContext';


const EmailPopover = ({ project_id, token }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [emailInput, setInput] = useState('')
  const [errorInput, setErrorInput] = useState({invalid: false, message: ''})
  const [alert, setAlert]  = useState(null)
  const handleInvite = (e) => setAnchorEl(e.currentTarget)
  const handleClose = () => {
    setAnchorEl(null)
    setInput('')
    setAlert(null)
  }
  const handleInput = (e) => setInput(e.currentTarget.value)

  const handleSubmit = (e) => {
    e.preventDefault()

    const params = { email: emailInput, project_id: project_id }
    inviteProjectUser({params: params, token: token}).then(res => {
      setAlert(res.message)
    })
  }
  return (
    <>
      <Button size='small' variant='contained' onClick={handleInvite}>Invite</Button>
      <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}
        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
      >
        <div style={{ padding: '1rem' }}>
          <form onSubmit={handleSubmit}>
            <TextField error={errorInput.invalid} name='email' id="email" label="Email"
              value={emailInput} fullWidth required variant="outlined" margin="dense" onChange={handleInput}
            />
          </form>
          <Button onClick={handleSubmit}>Send</Button>
        </div>
      </Popover>
      <Snackbar open={Boolean(alert)} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {alert}
        </Alert>
      </Snackbar>
    </>
  )
}

function UpdateProjectForm ({ modalOpen, setModalOpen, project_id }) {
  const authCtx = useContext(AuthContext)
  const projectCtx = useContext(ProjectContext)
  const userCtx = useContext(UserContext)
  const [projectInput, setProjectIntput] = useState({
    name: '',
    description: '',
    tag_prefix: ''
  })
  const [inputErrors, setInputErrors] = useState({
    name: {invalid: false, message: ''},
    description: {invalid: false, message: ''},
    tag_prefix: { invalid: false, message: '' }
  })
  const [project, setProject] = useState({})

  useEffect(() => {
    getProject({project_id: project_id, token: authCtx.token})
    .then(res => {
      setProject(res.project)
      setProjectIntput({
        name: res.project.name,
        description: res.project.description,
        tag_prefix: res.project.tag_prefix,
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
      description: {invalid: false, message: ''},
      tag_prefix: {invalid: false, message: ''}
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
            InputProps={{
              readOnly: project.owner?.email != userCtx.currentUser.email,
            }}
          />

          <TextField
            error={inputErrors.description.invalid}
            helperText={inputErrors.description.message}
            margin="dense" id="description" label="Description" variant="standard"
            value={projectInput.description} onChange={handleInput}
            fullWidth multiline minRows={4}
            InputProps={{
              readOnly: project.owner?.email != userCtx.currentUser.email,
            }}
          />

          <TextField
            autoFocus margin="dense" id="tag_prefix" label="Prefix" variant="standard"
            value={projectInput.tag_prefix} onChange={handleInput}
            error={inputErrors.tag_prefix.invalid}
            helperText={inputErrors.tag_prefix.message}
            InputProps={{
              readOnly: project.owner?.email != userCtx.currentUser.email
            }}
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

              <div style={{marginTop: '1rem'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <Typography variant='h6'>Members</Typography>
                  <EmailPopover project_id={project_id} token={authCtx.token} />
                </div>
                <MenuList style={{ minHeight: '10rem', maxHeight: '15rem', overflowY: 'auto'}}>
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
        <Button onClick={handleClose} disabled={project.owner?.email != userCtx.currentUser.email}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={project.owner?.email != userCtx.currentUser.email}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateProjectForm;