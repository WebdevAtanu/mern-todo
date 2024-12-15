import React,{useState,useContext} from 'react';
import axios from 'axios';
import context from '../context';
import {Navigate} from 'react-router-dom'
import toast from 'react-hot-toast';

function Register() {
	const [name,setName]=useState("");
	const [email,setEmail]=useState("");
	const [password,setPassword]=useState("");
	const [load,setLoad]=useState(false);
	const {log,setLog}=useContext(context);

	const handleSubmit=async (e)=>{
		e.preventDefault();
		setLoad(true);
		try{
		const result=await axios.post(`${import.meta.env.VITE_BACKEND}/user/new`,{name,email,password},{
			header:{
				'content-type':'application/json'
			},
			withCredentials:true
		});
		toast(result.data.message);
		setLog(true);
		setLoad(false);
		}catch(error){
			toast(error.response.data.message);
			setLog(false);
			setLoad(false);
		}

	}
	if(log) return <Navigate to='/'/>
	return (
		<div className='register'>
			<form action="" onSubmit={handleSubmit}>
				<input type="text" name='name' placeholder='John Doe' value={name} onChange={e=>setName(e.target.value)} required/>
				<input type="email" name='email' placeholder='johndoe420@gmail.com' value={email} onChange={e=>setEmail(e.target.value)} required/>
				<input type="password" name='password' placeholder='password' value={password} onChange={e=>setPassword(e.target.value)} required/>
				<button type='submit' disabled={load} aria-busy={load} aria-live="polite">{load ? "wait..." : "Signup"}</button>
			</form>
		</div>
	)
}

export default Register