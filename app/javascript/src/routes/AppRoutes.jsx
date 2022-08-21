import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { BoardsPage, Home, SignUpPage, ProjectsPage } from '../pages';
import { destroyUserSession} from '../api/index'
import AuthContext from '../store/AuthContext';


function AppRoutes(){
  const authContext = useContext(AuthContext);
  const logoutHandler = () => {
    destroyUserSession(sessionStorage.getItem('session_token')).then(res => {
      authContext.logout();
      alert(res.message)
    })
  }

  const isLoggedIn = authContext.loggedIn;
  return (
    <Router>
        <div className="App-header">
         <ul className="App-nav">
          { isLoggedIn && (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/projects">Projects</Link>
              </li>
              <li>
                <Link to='/' onClick={logoutHandler}>Log Out</Link>
              </li> 
            </>
            )
          }
         </ul>
        <Routes>
          { authContext.loggedIn && (
            <>
              <Route exact path='/' element={< Home />}></Route>
              <Route exact path="/boards" element={ <BoardsPage/> }></Route>
              <Route exact path="/projects" element={ <ProjectsPage/> }></Route>
            </> )
          }
          { !authContext.loggedIn && <Route exact path="/registrations" element={ <SignUpPage/> }></Route> }
          { !authContext.loggedIn && <Route path='*' element={<Navigate to="/registrations" replace />}></Route> }
          { authContext.loggedIn && <Route path='*' element={<Navigate to="/" replace />}></Route>}
       </Routes>
       </div>
    </Router>
  )
}


export default AppRoutes;