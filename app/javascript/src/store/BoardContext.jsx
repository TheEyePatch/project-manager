import React, { useContext, useState, } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from './AuthContext'
import { getBoards } from '../api'

const BoardContext = React.createContext({
  boards: [],
  project_id: null,
  fetchBoards: () => {},
  setBoards: () => {},
})

export function BoardsContextProvider({ children }) {
  const [boards, setBoards] = useState([])
  const authCtx = useContext(AuthContext);
  const urlParams = useParams();
  const handleBoards = async (params = {}) => {
    let boardResponse = await getBoards({
      token: authCtx.token,
      params: {
        project_id: urlParams.project_id,
        ...params
      }
    })

    // setBoards(boardResponse)
    return boardResponse
  }


  const boardContextValue = {
    boards: boards,
    fetchBoards: handleBoards,
    project_id: urlParams.project_id,
    setBoards: setBoards
  }

  return <BoardContext.Provider value={boardContextValue}>{ children }</BoardContext.Provider>
}
export default BoardContext;
