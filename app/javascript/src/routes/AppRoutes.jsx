import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { BoardsPage, Home } from '../pages';


function AppRoutes(){
  return (
    <Router>
        <div className="App">
         <ul className="App-header">
           <li>
             <Link to="/">Home</Link>
           </li>
         </ul>
        <Routes>
              <Route exact path='/' element={< Home />}></Route>
              <Route exact path="/boards" element={ <BoardsPage/> }></Route>
       </Routes>
       </div>
    </Router>
  )
}


export default AppRoutes;