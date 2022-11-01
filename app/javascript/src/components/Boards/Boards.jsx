import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBoards, getProjects } from '../../api';
import AuthContext from '../../store/AuthContext'

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
  
  return <h1>{project.name}</h1>
}

export default Boards;
