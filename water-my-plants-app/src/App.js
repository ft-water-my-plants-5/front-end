import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import LoginSignup from "../src/login-signup.js";
import { Route, Switch } from "react-router-dom";

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
