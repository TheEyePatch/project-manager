import React, { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Boards } from '../components/index'
import { BoardsContextProvider } from "../store/BoardContext";
import { Container } from '@mui/material';
import { BoardsHeader } from '../components/index';
import SubHeaderContext from "../store/SubHeaderContext";


function BoardsPage() {
const params = useParams();
const subHeaderCtx = useContext(SubHeaderContext)

useEffect(() => {
  subHeaderCtx.setProjectId(params.project_id)
}, [params.project_id])

  return (
    <BoardsContextProvider>
      <section style={{ overflowY: 'auto', boxSizing: 'border-box', paddingLeft: '180px', paddingTop: '5rem', width: '100vw', height: '100vh',backgroundColor: '#FDF5E6'}}>
        <BoardsHeader/>
        <Container>
          <Boards/>
        </Container>
      </section>
    </BoardsContextProvider>
  )
}


export default BoardsPage;