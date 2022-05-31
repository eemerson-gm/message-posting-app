import React from "react";

import { Route, Routes } from "react-router-dom";

import Main from "./pages/main";
import Login from "./pages/login";
import Signup from "./pages/signup"
 
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