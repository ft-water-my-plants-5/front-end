import "./App.css";
//import axios from "axios";
import React, { useState } from "react";
import LoginSignup from "./components/login-signup.js";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import PlantForm from "./components/PlantForm";
import PlantPage from "./components/PlantPage";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer"
import Profile from "./components/Profile"


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));
  const [plants, setPlants] = useState([]);

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Switch>
        <PrivateRoute
          exact
          path="/plant-page"
          component={PlantPage}
          plants={plants}
          setPlants={setPlants}
        />
        <PrivateRoute
          exact
          path="/plant-form"
          component={PlantForm}
          plants={plants}
          setPlants={setPlants}
        />
        <Route path='/profile'><Profile /></Route>
        
        <Route path="/login">
          <LoginSignup setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route path="/">
          <LoginSignup setIsLoggedIn={setIsLoggedIn} />
        </Route>
      </Switch>
      <Footer isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    </div>
  );
}

export default App;
