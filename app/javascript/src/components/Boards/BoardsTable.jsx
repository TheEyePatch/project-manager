import React, { useState } from 'react';
import { Typography, Button, TextField, IconButton } from '@mui/material';
import { getBoards } from '../../api/index';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import style from './Boards.module.css'

const TABLE_HEADERS = [
  'Name',
  'Position',
  'Action'
]

const TITLE_MIN_LENGTH = 2
const POS_MIN = 1

function BoardsTable({project_id, boards, setBoards}) {
  const [boardInputs, setBoardInputs] = useState({
    title: '',
    position: '',
  });

  const [inputErrors, setInputErrors] = useState({
    title: false,
    positon: false,
  })

  const boardsHandler = (e) => {
    setBoardInputs(prev => {
      return {
        ...prev,
        [e.target.id]: e.target.value
      }
    })

    setInputErrors(prev => {
      return {
        ...prev,
        [e.target.id]: false
      }
    })
  }

  const handleInputErrors = () => {
    if(boardInputs.title.length < TITLE_MIN_LENGTH){
      setInputErrors(prev => {
        return {
          ...prev,
          ['title']: true,
        }
      })

      return
    } else if (boardInputs.position < POS_MIN) {
      setInputErrors(prev => {
        return {
          ...prev,
          ['position']: true,
        }
      })
      return
    }
  }

  const submitHandler = () => {
    if(boards.includes(boardInputs)){ // NOT WORKING
      alert('Board already exists!')
      return
    };

    if(boardInputs.title.length < TITLE_MIN_LENGTH || boardInputs.position < POS_MIN){
      handleInputErrors()

      return
    }

    setBoards(prev => [...prev, boardInputs] )
    setBoardInputs({
      title: '',
      position: '',
    })
  }

  const removeBoard = (e) => {
    const board = e.currentTarget.slot
    const tmp_boards = boards.map(board => JSON.stringify(board))
    tmp_boards.splice(tmp_boards.indexOf(board), 1)

    setBoards(tmp_boards.map(board => JSON.parse(board)))
  }

  return (
    <div>
      <div className={style['table-header']}>
        <Typography variant="h6" noWrap component="span"
            sx={{
              mb: 2,
              display: { md: 'flex' },
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Boards
        </Typography>
      </div>
      <table>
        <thead>
          <tr>
            {
              TABLE_HEADERS.map(header => {
                return (
                  <th key={header}>
                    <Typography variant="subtitle1" noWrap component="span"
                      sx={{
                        mr: 2,
                        display: { md: 'flex' },
                        color: 'inherit',
                        textDecoration: 'none',
                      }}
                    >
                      {header}
                    </Typography>
                  </th>
                )
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            boards?.map(board => {
              return (
                <tr key={board.title}>
                  <td>{board.title}</td>
                  <td>{board.position}</td>
                  <td>
                    <IconButton onClick={removeBoard} slot={JSON.stringify(board)} >
                      <DeleteIcon aria-hidden={true}/>
                    </IconButton>
                  </td>
                </tr>
              )
            })
          }

          <tr>
            <td>
              <TextField
                error={inputErrors.title}
                helperText={inputErrors.title ? "Incorrect entry." : null}
                id="title"
                label="Title"
                variant="filled"
                value={boardInputs.title}
                onChange={boardsHandler} />
            </td>
            <td>
              <TextField
                error={inputErrors.positon}
                helperText={inputErrors.positon ? "Incorrect entry." : null}
                id="position"
                type='number'
                label="Position"
                variant="filled"
                value={boardInputs.position}
                onChange={boardsHandler}/>
            </td>
            <td>
              <Button onClick={submitHandler} >
                <AddIcon/>
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default BoardsTable