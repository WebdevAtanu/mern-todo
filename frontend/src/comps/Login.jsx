import React,{useState,useContext} from 'react';
import axios from 'axios';
import {Navigate} from 'react-router-dom'
import context from '../context';
import toast from 'react-hot-toast';

function Login() {
	const [email,setEmail]=useState();
	const [password,setPassword]=useState();
	const {log,setLog}=useContext(context);
	const handleSubmit=async (e)=>{
		e.preventDefault();
		try{
		const result=await axios.post('http://localhost:8080/user/login',{email,password},{
			header:{
				'content-type':'application/json'
			},
			withCredentials:true
		});
		toast.success(result.data.message);
		setLog(true);
		}catch(error){
			toast('Invalid username or password');
			setLog(false);
		}

	}
	if(log) return <Navigate to='/dashboard'/>
	return (
		<div className='login'>
			<form action="" onSubmit={handleSubmit}>
				<input type="email" name='email' placeholder='johndoe420@gmail.com' value={email} onChange={e=>setEmail(e.target.value)} required/>
				<input type="password" name='password' placeholder='password' value={password} onChange={e=>setPassword(e.target.value)} required/>
				<button type='submit'>Log in</button>
			</form>
		</div>
	)
}

export default Login