import React, { useState }  from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import { NewTaskForm, NewBoardForm } from './../index'

function BoardsCreateButton({ boards, project_id, token, setBoards }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [boardModalOpen, setBoardModalOpen] = useState(false)

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
      <NewTaskForm
          modalOpen={modalOpen}
          setBoards={setBoards}
          setModalOpen={setModalOpen}
          project_id={project_id}
          token={token}
          boards={boards}
        />

      <NewBoardForm
        modalOpen={boardModalOpen}
        setModalOpen={setBoardModalOpen}
        setBoards={setBoards}
        project_id={project_id}
        token={token}
      />
      <ButtonGroup size="large" aria-label="large button group" variant=  'contained'>
        {buttons}
      </ButtonGroup>
    </Box>
  );
}

export default BoardsCreateButton