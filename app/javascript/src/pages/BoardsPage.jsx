import React, { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Boards } from '../components/index'
import { BoardsContextProvider } from "../store/BoardContext";
import { Container } from '@mui/material';
import { BoardsHeader } from '../components/index';
import AuthContext from "../store/AuthContext";
import { getBoards } from '../api/index'


function BoardsPage() {
const params = useParams();
const authCtx = useContext(AuthContext);

  return (
    <BoardsContextProvider>
      <section style={{ overflowY: 'auto', boxSizing: 'border-box', paddingTop: '5rem', width: '100vw', height: '100vh',backgroundColor: '#FDF5E6'}}>
        <BoardsHeader/>
        <Container>
          <Boards/>
        </Container>
      </section>
    </BoardsContextProvider>
  )
}


export default BoardsPage;