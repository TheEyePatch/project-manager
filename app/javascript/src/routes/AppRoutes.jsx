import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { BoardsPage, Home, SignUpPage } from '../pages';


function AppRoutes(){
  return (
    <Router>
        <div className="App">
         <ul className="App-header">
           <li>
             <Link to="/">Home</Link>
           </li>
           <li>
             <Link to="/registrations">SignUp</Link>
           </li>
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