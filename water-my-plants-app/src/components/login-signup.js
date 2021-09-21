import React from 'react';
import styled from 'styled-components';
import Styled from 'styled-components'
import theme from '../theme';

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

 export default function LoginSignup(){
	return(
		<LoginStyle>
			<div className='login'>
				<h3>login</h3>
				<label>{'email or username '}
					<input type='text' name='email'/>
				</label>
				<label>{'password '}
					<input type='text' name='password'/>
				</label>
				{/*todo: setup validation*/}
				{/*todo: loginbtn routes to homepage*/}
				<button>Log in</button>
			</div>

			<div className='signup'>
				<h3>signup</h3>
				<label>{'email '}
					<input type='text' name='email'/>
				</label>
				<label>{'username '}
					<input type='text' name='userName'/>
				</label>
				<label>{'password '}
					<input type='text' name='password'/>
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
