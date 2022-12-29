import React, { useEffect, useContext, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getBoards, getProjects } from '../../api';
import AuthContext from '../../store/AuthContext'
import { Container, Button } from '@mui/material';
import { Board, NewTaskForm, Task } from './../index';

const BOARDS_LENGTH = 6;

function Boards() {
  // HOOK USAGE
  const params = useParams();
  const authCtx = useContext(AuthContext);
  const [boards, setBoards] = useState([]);
  const [content, setContent] = useState('center')
  const [modalOpen, setModalOpen] = useState(false)
  const [dragging, setDragging] = useState(false)
  const selectedDragTask = useRef()
  const selectedNodeTask = useRef()
  const handleNewTask = () => {
    setModalOpen(true)
  }
  const container_style = {
    maxWidth: '90vw', overflowX: 'auto', display: 'flex', justifyContent: content,  padding: '1px', alignItems: 'start'
  }

  useEffect(() => {
    console.log('restarting')
    getBoards({ token: authCtx.token, project_id: params.project_id})
    .then(res => {
      setBoards(res)
      res.length > BOARDS_LENGTH ? setContent('start') : setContent('center')
    })
  }, [])

  const handleDragStart = (e, params) => {
    selectedDragTask.current = params;
    selectedNodeTask.current = e.target;
    // console.log('dragging', selectedDragTask.current)
    // console.log('node', selectedNodeTask.current)

    selectedNodeTask.current.addEventListener('dragend', handleDragEnd)
    setTimeout(() => setDragging(true), 0)
  }
  const handleDragEnd = () => {
    setDragging(false)
    selectedNodeTask.current.removeEventListener('dragend', handleDragEnd)
    selectedDragTask.current = null
    selectedNodeTask.current = null
  }
  const handleDragEnter = (e, params) => {
    
  }

  const taskBackgroundColor = (params) => {
    const currentItem = selectedDragTask.current
    console.log(currentItem != params)
    if(currentItem.boardIndex == params.boardIndex && currentItem.taskIndex == params.taskIndex){
      return 'rgba(0, 144, 154, 0.3)'
    }
  }
  return (
    <Container>
      <div style={{ 
        margin: '1rem 0 1rem',
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <Button variant="contained" size="large" onClick={handleNewTask}>New Task</Button>
        <NewTaskForm
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          project_id={params.project_id}
          token={authCtx.token}
        />
      </div>

      <Container style={container_style}>
          {
            boards?.map((board, boardIndex) => {
              return (
                <Board board={board} key={board.id}>
                  {
                    board.tasks?.map((task, taskIndex) => {
                      return (
                        <Task
                          task={task}
                          key={task.id}
                          onDragStart={(e) => handleDragStart(e, { boardIndex, taskIndex })}
                          onDragEnter={dragging ? (e) => handleDragEnter(e, { boardIndex, taskIndex }) : null }
                          backgroundColor={dragging ? taskBackgroundColor({ boardIndex, taskIndex }) : null}
                        />
                      )
                    })
                  }
                </Board>
              )
            })
          }
        </Container>
    </Container>
  )
}

export default Boards;
