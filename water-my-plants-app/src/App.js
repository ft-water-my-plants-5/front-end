import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import LoginSignup from "./components/login-signup.js";
import { Route, Switch } from "react-router-dom";
import styled from 'styled-components'

//filler state
// const [plants, setPlants] = useState([]);
// const [plant, setPlant] = useState();
// const [user, setUser] = useState();

// //SET DATA
// useEffect(
//   Axios.get("dummydata.api")
//     .then((res) => {
//       console.log(res.data);
//       setData(res.data);
//     })
//     .catch((er) => {
//       console.error(er);
//     }),
//   []
// );

//RETURN HTML
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <LoginSignup />
        </Route>
        <Route path="/">
          <LoginSignup />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
