import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../components/Home";
import About from "../components/About";
import { Board } from '../pages';


function AppRoutes(){
  return (
    <Router>
        <div className="App">
         <ul className="App-header">
           <li>
             <Link to="/">Home</Link>
           </li>
           <li>
             <Link to="/about">About Us</Link>
           </li>
         </ul>
        <Routes>
              <Route exact path='/' element={< Home />}></Route>
              <Route exact path='/about' element={< About />}></Route>
              <Route exact path="/boards" element={ <Board/> }></Route>
       </Routes>
       </div>
    </Router>
  )
}


export default AppRoutes;