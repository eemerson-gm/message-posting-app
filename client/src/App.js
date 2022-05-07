import React from "react";

import { Route, Routes } from "react-router-dom";

import Main from "./pages/Main.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
 
const App = () => {
 return (
   <div>
     <Routes>
       <Route exact path="/" element={<Main />} />
       <Route path="/login" element={<Login />} />
       <Route path="/signup" element={<Signup />} />
     </Routes>
   </div>
 );
};
 
export default App;