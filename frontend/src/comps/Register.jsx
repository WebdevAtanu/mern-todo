import React,{useState,useContext} from 'react';
import axios from 'axios';
import context from '../context';
import {Navigate} from 'react-router-dom'

function Register() {
	const [name,setName]=useState();
	const [email,setEmail]=useState();
	const [password,setPassword]=useState();
	const {log,setLog}=useContext(context);

	const handleSubmit=async (e)=>{
		e.preventDefault();
		try{
		const result=await axios.post(`${import.meta.env.VITE_BACKEND}/user/new`,{name,email,password},{
			header:{
				'content-type':'application/json'
			},
			withCredentials:true
		});
		alert(result.data.message);
		setLog(true);
		}catch(error){
			alert('Registration failed');
			setLog(false);
		}

	}
	if(log) return <Navigate to='/'/>
	return (
		<div className='register'>
			<form action="" onSubmit={handleSubmit}>
				<input type="text" name='name' placeholder='John Doe' value={name} onChange={e=>setName(e.target.value)} required/>
				<input type="email" name='email' placeholder='johndoe420@gmail.com' value={email} onChange={e=>setEmail(e.target.value)} required/>
				<input type="password" name='password' placeholder='password' value={password} onChange={e=>setPassword(e.target.value)} required/>
				<button type='submit'>Sign up</button>
			</form>
		</div>
	)
}

export default Register