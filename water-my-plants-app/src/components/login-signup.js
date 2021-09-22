import React, {useState} from 'react';
import Styled from 'styled-components'

const LoginStyle= Styled.div`
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
		border: ${props=>props.theme.colors.greenSheen} solid 2px;
		border-radius: 3px;
		box-shadow: 1px 2px;
		margin-top:10px;
		margin-left:10px;
		margin-right:10px;
		height: 120px;
		@media(max-width: 500px){
			
		}
		button{
			width:30%;
			align-self:center;
		}
	}
`
	
const initiallogin={
	userName:'',
	password:'',
  }	
  
  const initialsignup={
	userName:'',
	phoneNumber:'',
	password:'',
  }

 export default function LoginSignup(){
	const [loginData, setLoginData] = useState(initiallogin);
	const [signupData, setSignupData] = useState(initialsignup);

  	const updatelogin =(inputName, inputValue)=>{
		  //validate
    	setLoginData({...loginData, [inputName]:inputValue});
  	}
	  const updatesignup =(inputName, inputValue)=>{
		//validate
	  setSignupData({...signupData, [inputName]:inputValue});
	}

	const onChange = evt => {
    	const {name, value} = evt.target;
		evt.target.parentElement.parentElement.className === 'login' ?
        updatelogin(name, value):
		updatesignup(name,value);
    }

	return(
		<LoginStyle>
			<div className='login'>
				<h3>login</h3>
				<label>{'username '}
					<input type='text' name='userName' value={loginData.userName} onChange={onChange}/>
				</label>
				<label>{'password '}
					<input type='password' name='password' value={loginData.password} onChange={onChange}/>
				</label>

				{/*todo: setup validation*/}
				{/*todo: loginbtn routes to homepage*/}
				<button>Log in</button>
			</div>

			<div className='signup'>
				<h3>signup</h3>
				<label>{'username '}
					<input type='text' name='userName' value={signupData.userName} onChange={onChange}/>
				</label>
				<label>{'phone number '}
					<input type='text' name='phoneNumber' value={signupData.phoneNumber} onChange={onChange}/>
				</label>
				<label>{'password '}
					<input type='password' name='password' value={signupData.password} onChange={onChange}/>
				</label>
				<button>sign up</button>
				{/*todo: setup validation*/}
				{/*todo: signupbtn routes to homepage?*/}
			</div>
		</LoginStyle>
	)
}

/*user
dummyData
userName
phoneNumber
password
*/
