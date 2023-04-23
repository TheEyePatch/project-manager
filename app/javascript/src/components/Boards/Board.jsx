import React, { useState, useEffect } from 'react'
import { Box, Typography, IconButton } from '@mui/material';
import { Task, UpdateBoardForm } from './../index';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';

function Board ({ board, children, onDragEnter }) {
  const [currentBoard, setCurrentBoard] = useState(board);
  const [modalOpen, setModalOpen] = useState(false);
  const handleEdit = () => {
    setModalOpen(true);
  }
  return (
    <>
      <Box
        onDragEnter={onDragEnter}
        key={board.id}
        sx={{ margin: '.5rem',
                boxSizing: 'border-box',
                p: '.5rem',
                width: '14rem',
                backgroundColor: '#F5F5F5',
                borderRadius: '.2rem',
                minHeight: '30vh',
                position: 'relative',
                flexShrink: '0' }}
      >
        <Box style={{ padding: '.2rem', marginBottom: '.3rem' }}>
          <Typography
            noWrap
            variant='h6'
            sx={{
              color: 'text.primary',
              fontWeight:'bold'
            }}>
            {currentBoard.title}
          </Typography>
          <IconButton onClick={handleEdit}>
            <BorderColorTwoToneIcon fontSize='small'/>
          </IconButton>
        </Box>
      <Box style={{ minHeight: '80%'}}>
        { children }
      </Box>
      </Box>

    {
      modalOpen && (
        <UpdateBoardForm
          modalOpen={modalOpen}
          board={currentBoard}
          setModalOpen={setModalOpen}
          setCurrentBoard={setCurrentBoard}
        />
      )
    }
    </>
  )
}

export default Board;