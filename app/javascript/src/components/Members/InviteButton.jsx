import React, { useState } from "react";
import { Fab, Popper, Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { inviteProjectUser } from "../../api";

export default function InviteButton ({token, project_id}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [email, setEmailInput] = useState('')

  const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
  }

  const formStyle = {
    background: 'white',
    padding: '1.5rem',
    boxShadow: '1px 1px 5px grey',
    borderRadius: '.5rem'
  }

  const handleAddButton = (e) => {
    Boolean(anchorEl) ? setAnchorEl(null) : setAnchorEl(e.currentTarget)
  }
  
  const handleEmailInput = (e) => setEmailInput(e.currentTarget.value)
  const handleSubmit = () => {
    let params = { email: email, project_id: project_id }
  
    inviteProjectUser({params: params, token: token})
    .then(res => console.log(res))

    setAnchorEl(null)
    setEmailInput('')
  }

  return (
    <>
      <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement={'top-end'}>
        <div>
          <form onSubmit={handleSubmit} style={formStyle}>
            <TextField placeholder='Input Email...' value={email} onChange={handleEmailInput} style={{ marginBottom: '.5rem', minWidth: '15rem', boxSizing: 'border-box'}}/>
            <Button variant='contained' style={{display: 'block'}} onClick={handleSubmit}>Invite</Button>
          </form>
        </div>
      </Popper>
      <Fab onClick={handleAddButton} sx={fabStyle} color='primary'><AddIcon/></Fab>
    </>
  )
}
