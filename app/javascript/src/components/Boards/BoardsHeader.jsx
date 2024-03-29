import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { BoardsCreateButton } from '../index'
import AuthContext from '../../store/AuthContext'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {  TextField, InputAdornment, FormControlLabel, Popover, Checkbox, MenuItem, MenuList, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import BoardContext from '../../store/BoardContext';
import UserContext from '../../store/UserContext';
import { getIndexTasks } from '../../api'

function BoardsHeader () {
  const params = useParams();
  const authCtx = useContext(AuthContext)
  const boardCtx = useContext(BoardContext)
  const userCtx = useContext(UserContext)
  const [filter, setFilter] = useState({
    task_title: '',
    user_id: '',
    tag: '',
    project_id: params.project_id
  });
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedNames, setSelectedNames] = useState([])

  useEffect(() => {
    userCtx.fetchProjectMembers({project_id: params.project_id})
    .then(res => {
      userCtx.setProjectMembers([...res.participants, res.owner])
    })
  }, [])

  const filterTasks = async (filter) => {
    const tasksData = await getIndexTasks(filter)
    const tasks = tasksData.tasks

    boardCtx.setBoards(prev => {
      const boards = prev.map(board => {
       board.tasks = tasks[board.id]
       return board
      })

      return boards
    })
  }

  const handleSearch = (e) => {
    e.preventDefault()

    filterTasks({params: filter, token: authCtx.token})
  }

  const handleAvatar = (e) => setAnchorEl(e.currentTarget)

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
      const params = {...filter, assignee_id: [...selectedNames, member.id]}
      filterTasks({params: params, token: authCtx.token})
    } else {
      const nameMap = Array.from(selectedNames)
      const index = nameMap.indexOf(member.id)
      const params = {...filter, assignee_id: nameMap}

      nameMap.splice(index, 1)
      filterTasks({params: params, token: authCtx.token})
    }
  }

  return (
    <div style={{ padding: '1rem', margin: '1rem', display: 'flex', justifyContent: 'space-around'}}>
      <div style={{ display: 'flex', alignItems: 'flex-end', minWidth: '25vw' }}>
        <form onSubmit={handleSearch} style={{ marginRight: '1rem', marginLeft: '1rem' }}>
          <Stack direction='row' spacing={2}>
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
              placeholder='New task'
            />

            <TextField
              id='tag'
              label='Tag'
              value={filter.tag}
              onChange={(e) => setFilter(prev => { return { ...prev, tag: e.target.value } })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              placeholder='PRJT-1'
            />

            <input hidden type="submit" value="Submit" />
          </Stack>
        </form>
        <AvatarGroup max={6} total={userCtx.projectMembers.length} onClick={handleAvatar}>
        {
          userCtx.projectMembers?.map((member, index) => {
            return (
              <Avatar key={member.id} alt={member.account} src={member.avatar_url}>
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
                userCtx.projectMembers?.map(member => {
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
