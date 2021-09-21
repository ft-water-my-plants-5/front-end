import React, {useState} from 'react';
import Styled from 'styled-components'

const LoginStyle= Styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	align-items: center;
	div{
		display: flex;
		flex-direction column;
		border: ${props=>props.theme.colors.greenSheen} solid 2px;
		border-radius: 3px;
		box-shadow: 1px 2px;
		margin-top:10px;
		margin-left:10px;
		margin-right:10px;
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
	const [signupData, setsignupData] = useState(initialsignup);

  	const updatelogin =(inputName, inputValue)=>{
		  //validate
    setLoginData({...loginData, [inputName]:inputValue});
  	}

	const onChange = evt => {
    	const {name, value, checked, type} = evt.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        updatelogin(name, valueToUse);
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
					<input type='text' name='userName' value={signupData.userName} onChange={(evt)=>console.log(evt.target.parentElement.parentElement.className)}/>
				</label>
				<label>{'phone number '}
					<input type='text' name='phoneNumber' value={signupData.phoneNumber}/>
				</label>
				<label>{'password '}
					<input type='password' name='password' value={signupData.password}/>
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
