import React from 'react'
import { Box } from '@mui/material';

function Board ({ board }) {
  return (
    <Box
        item key={board.id}
        style={{ margin: '.5rem',
                boxSizing: 'border-box',
                p: '2',
                width: '12rem',
                border: '2px solid grey',
                backgroundColor: 'rgb(230, 230, 230)',
                borderRadius: '.2rem',
                minHeight: '80vh',
                position: 'relative',
                flexShrink: '0' }}
    >
      <Box style={{ padding: '.2rem', marginBottom: '.3rem' }}>
        <h3>{board.title}</h3>
      </Box>
      <Box style={{ padding: '.2rem', backgroundColor: 'rgb(0, 230, 230)', minHeight: '80%'}}>
      </Box>
    </Box>
  )
}

export default Board;