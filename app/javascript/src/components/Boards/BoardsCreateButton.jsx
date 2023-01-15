import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';

function BoardsCreateButton({ setModalOpen, setBoardModalOpen }) {
  const handleNewTask = () => {
    setModalOpen(true)
  }

  const handleNewBoard = () => {
    setBoardModalOpen(true)
  }

  const buttons = [
    <Button key="one" onClick={handleNewTask}>Create Task</Button>,
    <Button key="two" onClick={handleNewBoard}>Create Board</Button>,
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup size="large" aria-label="large button group" variant=  'contained'>
        {buttons}
      </ButtonGroup>
    </Box>
  );
}

export default BoardsCreateButton