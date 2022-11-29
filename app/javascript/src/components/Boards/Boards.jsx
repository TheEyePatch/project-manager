import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBoards, getProjects } from '../../api';
import AuthContext from '../../store/AuthContext'
import { Container, Grid, Box } from '@mui/material';
import { Board } from './../index';

function Boards() {
  const boardsLength = 6
  const params = useParams();
  const authCtx = useContext(AuthContext);
  const [boards, setBoards] = useState([]);
  const [content, setContent] = useState('center')

  useEffect(() => {
    console.log('restarting')
    getBoards({
                  token: authCtx.token,
                  project_id: params.project_id
                }).then(res => {
                  setBoards(res.boards)
                  if (res.boards.length > 6) {
                    setContent('start')
                  } else {
                    setContent('center')
                  }
                })
  }, [])

  const container_style = {
    maxWidth: '90vw', overflowX: 'auto', display: 'flex', justifyContent: content,  padding: '1px'
  }
  
  return (
    <Container style={container_style}>
        {
          boards?.map(board => {
            return (
              <Board board={board} key={board.id}/>
            )
          })
        }
    </Container>
  )
}

export default Boards;
