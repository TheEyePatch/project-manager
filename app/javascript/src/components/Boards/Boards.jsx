import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBoards, getProjects } from '../../api';
import AuthContext from '../../store/AuthContext'
import { Container, Grid, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Board } from './../index'

function Boards() {
  const params = useParams();
  const authCtx = useContext(AuthContext);
  const [project, setProject] = useState({});
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    getBoards({
                  token: authCtx.token,
                  project_id: params.project_id
                }).then(res => {
                  setProject(res.project);
                  setBoards(res.boards)
                })
  }, [])
  
  return (
    <Container style={{maxWidth: '90vw', overflowY: 'auto', display: 'flex', justifyContent: 'center'}}>
        {
          boards?.map(board => {
            return (
              <Board board={board} key={board.id}/>
            )
          })
        }

        <Box item
              style={{ margin: '.5rem',
                      p: '2',
                      width: '12rem',
                      border: '2px dashed grey',
                      backgroundColor: 'rgb(230, 230, 230)',
                      borderRadius: '.2rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center' }}
        >
          <AddIcon fontSize='large'/>
        </Box>
    </Container>
  )
}

export default Boards;
