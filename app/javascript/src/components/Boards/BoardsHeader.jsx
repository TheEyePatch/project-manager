import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { BoardsCreateButton } from '../index'
import AuthContext from '../../store/AuthContext'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {  TextField, InputAdornment, FormGroup, FormControlLabel, Popover, Checkbox, MenuItem, ListItemText, MenuList } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import BoardContext from '../../store/BoardContext';
import { getProjectMembers } from '../../api';

function BoardsHeader () {
  const params = useParams();
  const authCtx = useContext(AuthContext);
  const boardCtx = useContext(BoardContext)
  const [filter, setFilter] = useState({
    task_title: '',
    user_id: '',
  });
  const [members, setMembers] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedNames, setSelectedNames] = useState([])

  useEffect(() => {
    getProjectMembers({params: {project_id: params.project_id}, token: authCtx.token})
    .then(res => {
      setMembers(res.participants)
      console.log(res.participants)
    })
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()

    boardCtx.fetchBoards(filter)
    .then(res => boardCtx.setBoards(res)
    )
  }

  const handleAvatar = (e) => setAnchorEl(e.currentTarget)
  const fetchBoards = () => {
    console.log(selectedNames)
  }

  const handleSelectMember = (e, member) => {
    setSelectedNames(prev => {
      if(e.currentTarget.checked && !prev.includes(member.id)) return [...prev, member.id]

      if(!e.currentTarget.checked && prev.includes(member.id)){
        let index = prev.indexOf(member.id)
        let newArray = Array.from(prev)
        newArray.splice(index, 1)
        return newArray
      }
    })

    if(e.currentTarget.checked) {
      boardCtx.fetchBoards({assignee_id: [...selectedNames, member.id]})
      .then(res => boardCtx.setBoards(res))
    } else {
      const newArr = Array.from(selectedNames)
      const index = newArr.indexOf(member.id)
      newArr.splice(index, 1)

      boardCtx.fetchBoards({assignee_id: newArr})
      .then(res => boardCtx.setBoards(res))
    }
  }

  return (
    <div style={{ padding: '1rem', margin: '1rem', display: 'flex', justifyContent: 'space-around'}}>
      <div style={{ display: 'flex', alignItems: 'flex-end', minWidth: '25vw' }}>
        <form onSubmit={handleSearch} style={{ marginRight: '1rem', marginLeft: '1rem' }}>
          <TextField
            id="task_title"
            label="Search Task Name"
            value={filter.task_name}
            onChange={(e) => setFilter(prev => { return { ...prev, task_title: e.target.value } })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </form>
        <AvatarGroup max={6} total={members.length} onClick={handleAvatar}>
        {
          members?.map((member, index) => {
            return (
              <Avatar key={member.id} alt={member.account} src={member.avatar_image_url}>
                {member.account[0]}
              </Avatar>
            )
          })
        }
        </AvatarGroup>
        <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={(e) => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {
            <MenuList style={{ display: 'fex',padding: '10px', maxHeight: '15rem', overflowY: 'auto'}}>
              {
                members?.map(member => {
                  return (
                    <MenuItem key={member.id}>
                     <FormControlLabel
                      label={member.account}
                      control={<Checkbox checked={selectedNames?.includes(member.id)} onChange={(e) => handleSelectMember(e, member)} />}
                    />
                    </MenuItem>
                  )
                })
              }
          </MenuList>
          }
        </Popover>
      </div>
      <BoardsCreateButton project_id={params.project_id} token={authCtx.token}/>
    </div>
  )
}

export default BoardsHeader