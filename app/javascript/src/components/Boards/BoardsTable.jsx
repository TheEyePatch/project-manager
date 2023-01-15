import React, { useState } from 'react';
import { Typography, Button, TextField, IconButton } from '@mui/material';
import { getBoards } from '../../api/index';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import InputIcon from '@mui/icons-material/Input';
import style from './Boards.module.css'

const TABLE_HEADERS = [
  'Name',
  'Position',
  'Action'
]

const TITLE_MIN_LENGTH = 2
const POS_MIN = 1

function BoardsTable({ boards, setBoards}) {
  const removeBoard = (e) => {
    const board = e.currentTarget.slot
    const tmp_boards = boards.map(board => JSON.stringify(board))
    tmp_boards.splice(tmp_boards.indexOf(board), 1)

    setBoards(tmp_boards.map(board => JSON.parse(board)))
  }

  const editBoard = (e) => {
    const board = e.currentTarget.slot
    console.log('Edit', board)
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
                    <IconButton onClick={editBoard} slot={JSON.stringify(board)} >
                      <InputIcon aria-hidden={true}/>
                    </IconButton>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default BoardsTable