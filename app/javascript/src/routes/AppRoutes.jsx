import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { BoardsPage, Home, SignUpPage } from '../pages';
import { Button } from '@mui/material'
import { destroyUserSession} from '../api/index'
import AuthContext from '../store/AuthContext';


function AppRoutes(){
  const logoutHandler = () => {
    destroyUserSession(sessionStorage.getItem('session_token')).then(res => {
      sessionStorage.removeItem('session_token')
      alert(res.message)
    })
  }

  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext.loggedIn;
  return (
    <Router>
        <div className="App">
         <ul className="App-header">
          {
            isLoggedIn && <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Button onClick={logoutHandler}>Log Out</Button>
              </li>
            </>
          }
         </ul>
        <Routes>
              <Route exact path='/' element={< Home />}></Route>
              <Route exact path="/boards" element={ <BoardsPage/> }></Route>
              <Route exact path="/registrations" element={ <SignUpPage/> }></Route>
       </Routes>
       </div>
    </Router>
  )
}


export default AppRoutes;