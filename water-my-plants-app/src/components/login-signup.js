import axios from "axios";
import React, { useState } from "react";
import Styled from "styled-components";
import { useHistory } from "react-router-dom";

const LoginStyle = Styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	align-items: center;
	@media(max-width: 500px){
		
	}
	div{
		display: flex;
        flex-direction column;
        justify-content: space-around;
        border: ${(props) => props.theme.colors.amazon} solid 2.5px;
        border-radius: 3px;
        box-shadow: 3px 3px 15px 1px;
        margin-top:10px;
        margin-left:10px;
        margin-right:10px;
        height: 120px;
        h3{align-self: center;}
        button{
            width:30%;
            align-self:center;
            background-color:${(props) => props.theme.colors.greenSheen};
        }
		label{
            display:flex; 
            flex-flow:row no-wrap;
	}
	input{
                margin-left:3px;
                justify-content:flex-end;
                background-color:${(props) => props.theme.colors.greenSheen};
                color:white;
                letter-spacing:1px;
            }
}
`;

const initiallogin = {
  username: "",
  password: "",
};

const initialsignup = {
  username: "",
  password: "",
  phone_number: "",
};

export default function LoginSignup() {
  const [loginData, setLoginData] = useState(initiallogin);
  const [signupData, setSignupData] = useState(initialsignup);

  const history = useHistory();

  const updatelogin = (inputName, inputValue) => {
    //validate
    setLoginData({ ...loginData, [inputName]: inputValue });
  };
  const updatesignup = (inputName, inputValue) => {
    //validate
    setSignupData({ ...signupData, [inputName]: inputValue });
  };

  const onChange = (evt) => {
    const { name, value } = evt.target;
    evt.target.parentElement.parentElement.className === "login"
      ? updatelogin(name, value)
      : updatesignup(name, value);
  };

  const login = (evt) => {
    axios
      .post("https://ft-water-my-plants-5.herokuapp.com/api/login", loginData)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        history.push("/plant-page");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signUp = (evt) => {
    evt.preventDefault();
    axios
      .post(
        "https://ft-water-my-plants-5.herokuapp.com/api/register",
        signupData
      )
      .then((res) => {
        console.log(signupData);
      })
      .catch((err) => {
        console.log(err);
        console.log(signupData);
      });
  };

  return (
    <LoginStyle>
      <div className="login">
        <h3>login</h3>
        <label>
          {"username "}
          <input
            type="text"
            name="username"
            value={loginData.username}
            onChange={onChange}
          />
        </label>
        <label>
          {"password"}
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={onChange}
          />
        </label>

        {/*todo: setup validation*/}
        {/*todo: loginbtn routes to homepage*/}
        <button onClick={login}>Log in</button>
      </div>

      <div className="signup">
        <h3>signup</h3>
        <label>
          {"username "}
          <input
            type="text"
            name="username"
            value={signupData.username}
            onChange={onChange}
          />
        </label>
        <label>
          {"password "}
          <input
            type="password"
            name="password"
            value={signupData.password}
            onChange={onChange}
          />
        </label>
        <label>
          {"phone number "}
          <input
            type="text"
            name="phone_number"
            value={signupData.phone_number}
            onChange={onChange}
          />
        </label>
        <button onClick={signUp}>sign up</button>
        {/*todo: setup validation*/}
        {/*todo: signupbtn routes to homepage?*/}
      </div>
    </LoginStyle>
  );
}

/*user
dummyData
userName
phoneNumber
password
*/
