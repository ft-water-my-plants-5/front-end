import "./App.css";
//import axios from "axios";
import React, { useState } from "react";
import LoginSignup from "./components/login-signup.js";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import PlantForm from "./components/PlantForm";
import PlantPage from "./components/PlantPage";
import PrivateRoute from "./components/PrivateRoute";


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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Switch>
        <PrivateRoute exact path="/plant-page" component={PlantPage} />
        <PrivateRoute exact path="/plant-form" component={PlantForm} />
        {/* <Route path="/plant-page">
          <PlantPage />
        </Route>
        <Route path="/plant-form">
          <PlantForm />
        </Route> */}
        
        <Route path="/login">
          <LoginSignup setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route path="/">
          <LoginSignup setIsLoggedIn={setIsLoggedIn} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
