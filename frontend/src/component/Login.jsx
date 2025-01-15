import React,{useState,useContext} from 'react';
import axios from 'axios';
import {Navigate} from 'react-router-dom'
import context from '../context';
import toast from 'react-hot-toast';

function Login() {
	const [email,setEmail]=useState("");
	const [password,setPassword]=useState("");
	const [load,setLoad]=useState(false);
	const {log,setLog}=useContext(context);
	const handleSubmit=async (e)=>{
		e.preventDefault();
		setLoad(true);
		try{
		const result=await axios.post(`${import.meta.env.VITE_BACKEND}/user/login`,{email,password},{
			header:{
				'content-type':'application/json'
			},
			withCredentials:true
		});
		toast.success(result.data.message);
		setLog(true);
		setLoad(false);
		}catch(error){
			toast('Invalid username or password');
			setLog(false);
			setLoad(false);
		}

	}
	if(log) return <Navigate to='/'/>
	return (
		<div className='login'>
			<form action="" onSubmit={handleSubmit}>
				<input type="email" name='email' placeholder='johndoe420@gmail.com' value={email} onChange={e=>setEmail(e.target.value)} required/>
				<input type="password" name='password' placeholder='password' value={password} onChange={e=>setPassword(e.target.value)} required/>
				<button type='submit' disabled={load} aria-busy={load} aria-live="polite">{load ? "wait..." : "Login"}</button>
			</form>
		</div>
	)
}

export default Login