import React, { useContext } from "react";
import { useParams } from 'react-router-dom';
import { Boards } from '../components/index'
import BoardContext, { BoardsContextProvider } from "../store/BoardContext";
import { Container } from '@mui/material';
import { BoardsCreateButton } from '../components/index';
import AuthContext from "../store/AuthContext";


function BoardsPage() {
  const params = useParams();
  const authCtx = useContext(AuthContext);

  return (
    <>
      <BoardsContextProvider>
        <Container style={{ maxWidth: '75vw' }}>
          <div style={{ 
            margin: '1rem 0 1rem',
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <BoardsCreateButton
              project_id={params.project_id}
              token={authCtx.token}
            />
          </div>
          <Boards/>
        </Container>
      </BoardsContextProvider>
    </>
  )
}


export default BoardsPage;