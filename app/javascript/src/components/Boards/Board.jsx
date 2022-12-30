import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material';
import { Task } from './../index';
import { getIndexTasks } from '../../api';

function Board ({ board, children }) {
  return (
    <Box
        item key={board.id}
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
          {board.title}
        </Typography>
      </Box>
      <Box style={{ minHeight: '80%'}}>
        { children }
      </Box>
    </Box>
  )
}

export default Board;