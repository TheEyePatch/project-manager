import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";
import { Home, SignUpPage, BoardsPage, ProfilePage, ProjectsPage } from '../pages';
import { Header, Projects, Boards } from '../components';
import { destroyUserSession } from '../api/index'
import AuthContext from '../store/AuthContext';
import MembersPage from "../pages/members/MembersPage";
import { SubHeaderContextProvider } from '../store/SubHeaderContext'


function AppRoutes(){
  const authContext = useContext(AuthContext);
  const logoutHandler = () => {
    destroyUserSession(sessionStorage.getItem('session_token')).then(res => {
      authContext.logout();
    })
  }

  return (
    <SubHeaderContextProvider>
      <Router>
        <div className="App-header">
          {
            authContext.loggedIn && <Header logoutHandler={logoutHandler}/>
          }

          <section style={{
            // paddingTop: '1rem',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Routes>
              { authContext.loggedIn && (
                <>
                  <Route exact path='/' element={< Home />}></Route>
                  <Route path='/projects/:project_id/boards' element={ <BoardsPage/> }></Route>
                  <Route exact path="/projects" element={ <ProjectsPage/> }></Route>
                  <Route exact path="/profile" element={ <ProfilePage/> }></Route>
                  <Route exact path='/projects/:project_id/members' element={ <MembersPage/> }></Route>
                  <Route path='*' element={<Navigate to="/" replace />}></Route>
                </> )
              }
              { !authContext.loggedIn && <Route exact path="/registrations" element={ <SignUpPage/> }></Route> }
              { !authContext.loggedIn && <Route path='*' element={<Navigate to="/registrations" replace />}></Route> }
            </Routes>
          </section>
        </div>
      </Router>
    </SubHeaderContextProvider>
  )
}


export default AppRoutes;