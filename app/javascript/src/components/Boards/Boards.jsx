import React, { useEffect, useContext, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getBoards, getProjects, importTask } from '../../api';
import AuthContext from '../../store/AuthContext'
import { Container, Button, MenuItem, TextField } from '@mui/material';
import { Board, Task, BoardsCreateButton } from './../index';
import { ConstructionOutlined } from '@mui/icons-material';

const BOARDS_LENGTH = 3;

function Boards() {
  // HOOK USAGE
  const params = useParams();
  const authCtx = useContext(AuthContext);
  const [boards, setBoards] = useState([]);
  const [content, setContent] = useState('center')
  const [dragging, setDragging] = useState(false)
  const selectedDragTask = useRef()
  const selectedNodeTask = useRef()
  const importTaskParam = useRef({})

  useEffect(() => {
    getBoards({ token: authCtx.token, project_id: params.project_id})
    .then(res => {
      setBoards(res)
      res.length > BOARDS_LENGTH ? setContent('start') : setContent('center')
    })
  }, [])

  const handleDragStart = (e, params) => {
    selectedDragTask.current = params;
    selectedNodeTask.current = e.target;

    selectedNodeTask.current.addEventListener('dragend', handleDragEnd)
    setTimeout(() => setDragging(true), 0)
  }
  const handleDragEnd = () => {
    importTask({task: importTaskParam.current})
      .then(res => {
        setBoards(oldBoards => {
          const newBoards = oldBoards.map(item => {
              if(res.id == item.id) return res

              return item
            }
          )

          return newBoards
        })
      })

    setDragging(false)
    selectedNodeTask.current.removeEventListener('dragend', handleDragEnd)
    selectedDragTask.current = null
    selectedNodeTask.current = null
  }
  const handleDragEnter = (e, params) => {
    if (JSON.stringify(selectedDragTask.current) == JSON.stringify(params)) return

    const selectedBoardId = selectedDragTask.current.board_id
    const selectedBoardIndex = selectedDragTask.current.boardIndex
    const selectedTaskIndex = selectedDragTask.current.taskIndex
    setBoards(oldBoard => {
      const newBoard = oldBoard.map(item => item)
      const selectedTask = newBoard[selectedBoardIndex].tasks[selectedTaskIndex]
      const enteredTask = newBoard[selectedBoardIndex].tasks[params.taskIndex]
      newBoard[selectedBoardIndex].tasks.splice(selectedTaskIndex, 1)
      if(params.board_id == selectedBoardId) {
        newBoard[params.boardIndex].tasks.splice(params.taskIndex, 0, selectedTask)
        selectedDragTask.current = params
        importTaskParam.current.board_id = params.board_id
        importTaskParam.current.id = selectedTask.id
        if(enteredTask.id != selectedTask.id) importTaskParam.current.position = enteredTask.position
      } else if(params.board_id != selectedBoardId) { // If target of dragEnter is a different board or in a different board
        newBoard[params.boardIndex].tasks.push(selectedTask)
        const lastIndex = newBoard[params.boardIndex].tasks.length - 1

        importTaskParam.current = { board_id: params.board_id, id: selectedTask.id }
        selectedDragTask.current = { boardIndex: params.boardIndex, taskIndex: lastIndex, board_id: selectedBoardId}
      }

      return newBoard        
    })
  }

  const taskBackgroundColor = (params) => {
    const currentItem = selectedDragTask.current
    if(currentItem.boardIndex != params.boardIndex) return
    if(currentItem.taskIndex != params.taskIndex) return

    return 'rgba(0, 144, 154, 0.2)'
  }

  const container_style = {
    maxWidth: '90vw', overflowX: 'auto', display: 'flex', justifyContent: content,  padding: '1px', alignItems: 'start'
  }

  return (
    <Container>
      <div style={{ 
        margin: '1rem 0 1rem',
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <BoardsCreateButton
          project_id={params.project_id}
          token={authCtx.token}
          setBoards={setBoards}
        />
      </div>

      <Container style={container_style}>
          {
            boards?.map((board, boardIndex) => {
              return (
                <Board
                board={board}
                key={board.id}
                onDragEnter={dragging && board.tasks.length < 1 ? (e) => handleDragEnter(e, { boardIndex, taskIndex: 0, board_id: board.id, position: board.tasks_count }) : null }>
                  {
                    board.tasks?.map((task, taskIndex) => {
                      return (
                        <Task
                          task={task}
                          key={task?.id}
                          onDragStart={(e) => handleDragStart(e, { boardIndex, taskIndex, board_id: board.id })}
                          onDragEnter={dragging ? (e) => handleDragEnter(e, { boardIndex, taskIndex, board_id: board.id, position: task.position }) : null }
                          backgroundColor={dragging ? taskBackgroundColor({ boardIndex, taskIndex, board_id: board.id }) : null}
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
