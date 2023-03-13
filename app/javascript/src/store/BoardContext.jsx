import React, { useContext, useState, } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from './AuthContext'
import { getBoards } from '../api'

const BoardContext = React.createContext({
  boards: [],
  fetchBoards: () => {},
  setBoards: () => {},
})

export function BoardsContextProvider({ children }) {
  const [boards, setBoards] = useState([])
  const authCtx = useContext(AuthContext);
  const urlParams = useParams();
  const handleBoards = async () => {
    let boardResponse = await getBoards({
      token: authCtx.token,
      project_id: urlParams.project_id 
    })

    setBoards(boardResponse)
    return boardResponse
  }


  const boardContextValue = {
    boards: boards,
    fetchBoards: handleBoards,
    setBoards: setBoards
  }

  return <BoardContext.Provider value={boardContextValue}>{ children }</BoardContext.Provider>
}
export default BoardContext;
