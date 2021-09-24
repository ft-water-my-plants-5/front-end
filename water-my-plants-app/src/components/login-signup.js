import axios from "axios";
import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import { useHistory } from "react-router-dom";
import schema, {loginSchema} from './schema';
import * as Yup from 'yup';

const LoginStyle = Styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	align-items: center;
  padding: 5%;
	@media(max-width: 500px){
		
	}
	div{
		display: flex;
        flex-direction column;
        justify-content: space-around;
        border: ${(props) => props.theme.colors.cambridgeBlue} solid 2.5px;
        border-radius: 5px;
        box-shadow: 3px 3px 15px 1px;
        margin-top:10px;
        margin-left:10px;
        margin-right:10px;
        height: 200px;
        h3{align-self: center;}
        color: ${(props) => props.theme.colors.amazon};
        button{
            width: 40%;
            align-self:center;
            background-color:${(props) => props.theme.colors.cambridgeBlue};
            color: ${(props) => props.theme.colors.eggshell};
            border-radius: 5px;
        }
		label{
            display:flex; 
            flex-flow:row no-wrap;
	}
	input{
                margin: 1% 0 2% 1.5%;
                justify-content:flex-end;
                background-color:${(props) => props.theme.colors.cambridgeBlue};
                color:eggshell;
                letter-spacing: 2px;
                border-radius: 5px;
            }
}

`;
//validity
const initialDisable = true;
const initialsignupErrors = {
	username:'',
	phone_number:'',
	password:'',
}

const initialloginErrors = {
	username:'',
	password:'',
}
const initiallogin = {
  username: "",
  password: "",
};

const initialsignup = {
  username: "",
  password: "",
  phone_number: "",
};

export default function LoginSignup(props) {
  const [loginData, setLoginData] = useState(initiallogin);
  const [signupData, setSignupData] = useState(initialsignup);
  const [signUpForm, setSignUpForm] = useState(false);
  const [signupDisable, setsignupDisable] = useState(initialDisable);
  const [loginDisable, setLoginDisable] = useState(initialDisable);
  const [signupErrors, setSignupErrors] = useState(initialsignupErrors);
  const [loginErrors, setLoginErrors] = useState(initialloginErrors);

  const validateSignup = (name, value) => {
	Yup.reach(schema, name)
	.validate(value)
	.then(()=> setSignupErrors({...signupErrors, [name]:''}))
	.catch((er)=> setSignupErrors({...signupErrors, [name]:er.errors[0]}))
	}

	const validateLogin = (name, value) => {
	Yup.reach(loginSchema, name)
	.validate(value)
	.then(()=> setLoginErrors({...loginErrors, [name]:''}))
	.catch((er)=> setLoginErrors({...loginErrors, [name]:er.errors[0]}))
	}

  const history = useHistory();

  const updatelogin = (inputName, inputValue) => {
    validateLogin(inputName, inputValue)
    setLoginData({ ...loginData, [inputName]: inputValue });
  };
  const updatesignup = (inputName, inputValue) => {
    validateSignup(inputName, inputValue)
    setSignupData({ ...signupData, [inputName]: inputValue });
  };

  useEffect(()=>{
    schema.isValid(signupData)
    .then(valid=> setsignupDisable(!valid))
  }, [signupData])
  useEffect(()=>{
    loginSchema.isValid(loginData)
    .then(valid=> setLoginDisable(!valid))
  }, [loginData])

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
        props.setIsLoggedIn(true);
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
		localStorage.setItem("token", res.data.token)
        props.setIsLoggedIn(true);
        history.push("/plant-page");
      })
      .catch((err) => {
        console.log(err);
        console.log(signupData);
      });
  };

  return (
    <LoginStyle>
      {!signUpForm && (

          <div className="login">
            <h3>Login</h3>
            <label>
              {"Username "}
              <input
                type="text"
                name="username"
                value={loginData.username}
                onChange={onChange}
              />
            </label>
            <label>
              {"Password"}
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={onChange}
              />
            </label>

            {/*todo: setup validation*/}
            {/*todo: loginbtn routes to homepage*/}
            <button disabled={loginDisable} onClick={login}>Log In</button>
			<button
            onClick={() => {
              setSignUpForm(true);
            }}
          >
            Sign Up!
          </button>
          </div>
      )}
      {signUpForm && (
        <div className="signup">
          <h3>Sign Up</h3>
          <label>
            {"Username "}
            <input
              type="text"
              name="username"
              value={signupData.username}
              onChange={onChange}
            />
          </label>
          <label>
            {"Password "}
            <input
              type="Password"
              name="password"
              value={signupData.password}
              onChange={onChange}
            />
          </label>
          <label>
            {"Telephone"}
            <input
              type="text"
              name="phone_number"
              value={signupData.phone_number}
              onChange={onChange}
            />
          </label>
          <button 
		  disabled={signupDisable}
		  onClick={signUp}>Sign Up</button>
         <button onClick={() => setSignUpForm(false)}>Back to Login</button>
        </div>
      )}
    </LoginStyle>
  );
}

/*user
dummyData
userName
phoneNumber
password
*/
