import React from 'react';

 export default function LoginSignup(){
	return(
		<>
			<div className='login'>
				<h3>login</h3>
				<label>{'email or username '}
					<input type='text' name='email'/>
				</label>
				<label>{'password '}
					<input type='text' name='password'/>
				</label>
				{/*todo: setup validation*/}
				{/*todo: setup loginbtn*/}
				{/*todo: loginbtn routes to homepage*/}
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
				{/*todo: setup validation*/}
				{/*todo: setup signupbtn*/}
				{/*todo: signupbtn routes to homepage?*/}
			</div>
		</>
	)
}
