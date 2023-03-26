import React, { useState, useEffect } from "react";
import { UserList } from './features/user/user-list';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Login from './features/login/login';
import PrivateRoutes from "../src/app/private-routes";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function setAuth(isAuth: boolean) {
    debugger;
    setIsAuthenticated(isAuth);
  }

  return (
    <div className="App">

      <Routes>  
        <Route path="/" element={<Login setAuth={setAuth} />} />
        <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} setAuth={setAuth} />} >
          <Route path="/user-list" element={<UserList />} />
        </Route>
      </Routes> 
 

  </div>
  );
}

export default App;
