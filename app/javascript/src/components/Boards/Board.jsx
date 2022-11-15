import React from 'react'
import { Box } from '@mui/material';

function Board ({ board }) {
  return (
    <Box
        item key={board.id}
        style={{ margin: '.5rem',
                p: '2',
                width: '12rem',
                border: '2px solid grey',
                backgroundColor: 'rgb(230, 230, 230)',
                borderRadius: '.2rem' }}
    >
      <div style={{ padding: '.2rem' }}>
        <h3>{board.title}</h3>
      </div>
    </Box>
  )
}

export default Board;