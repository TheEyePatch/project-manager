import React, { useContext, useState }  from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import { NewTaskForm, NewBoardForm } from './../index'
import BoardContext from '../../store/BoardContext';

function BoardsCreateButton({ project_id, token }) {
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
    {
      modalOpen &&
      <NewTaskForm
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        project_id={project_id}
        token={token}
      />
    }
    {
      boardModalOpen &&
      <NewBoardForm
        modalOpen={boardModalOpen}
        setModalOpen={setBoardModalOpen}
        project_id={project_id}
        token={token}
      />
    }
      <ButtonGroup size="large" aria-label="large button group" variant=  'contained'>
        {buttons}
      </ButtonGroup>
    </Box>
  );
}

export default BoardsCreateButton