import React,{useState} from 'react'
import Register from './Register';
import Login from './Login';
import { Flex,Box} from "@radix-ui/themes";

function User() {
	const [flag,setFlag]=useState(false);
	return (
		<div id='user'>
		<Flex id='box' direction='column'>
		<Box className='center'>
		{
			flag?
			<>
				<h2>Create your account !</h2>
				<p>By clicking “Save”, you will be re-directed to the dashboard.</p>
			</>
			:
			<>
				<h2>Login now !</h2>
				<p>Enter your e-mail and password as login credentials.</p>
			</>
		}
		</Box>
		{
			flag?<Register/>:<Login/>
		}

		<Box className='center'>
		{
			flag?<p>already have an account? <span onClick={e=>setFlag(!flag)}>log in</span></p>
			:
			<p>new user? <span onClick={e=>setFlag(!flag)}>sign up</span></p>
		}
		</Box>
		</Flex>
		</div>
	)
}

export default User