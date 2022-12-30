import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home, SignUpPage } from '../pages';
import { Header, Projects, Boards } from '../components';
import { destroyUserSession } from '../api/index'
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
         <Header
          logoutHandler={logoutHandler}
          isLoggedIn={isLoggedIn}
          />
          <section style={{
            paddingTop: '1rem',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Routes>
              { authContext.loggedIn && (
                <>
                  <Route exact path='/' element={< Home />}></Route>
                  <Route path='/boards/:project_id' element={ <Boards/> }></Route>
                  <Route exact path="/projects" element={ <Projects/> }></Route>
                </> )
              }
              { !authContext.loggedIn && <Route exact path="/registrations" element={ <SignUpPage/> }></Route> }
              { !authContext.loggedIn && <Route path='*' element={<Navigate to="/registrations" replace />}></Route> }
              { authContext.loggedIn && <Route path='*' element={<Navigate to="/" replace />}></Route>}
          </Routes>
        </section>
       </div>
    </Router>
  )
}


export default AppRoutes;