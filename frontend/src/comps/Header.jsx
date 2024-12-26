import React,{useContext} from 'react';
import {NavLink} from 'react-router-dom';
import context from '../context';
import axios from 'axios';
import toast from 'react-hot-toast';

function Header() {
	const {log,setLog}=useContext(context);
	const logoutHandler=async ()=>{
		const {data}=await axios.get(`${import.meta.env.VITE_BACKEND}/user/logout`,{
			withCredentials:true
		});
		console.log(data.message);
		toast.error('There is a problem in render hosting');
		setLog(false);
	}
	return (
		<div className='header'>
		<div>
			LOGO
		</div>
		<div className='links'>
			{
				log?<NavLink style={({isActive})=>({color:isActive?'#3b82f6':'white', background:isActive?'white':'#3b82f6'})} to={'/'}>Dashboard</NavLink>:<NavLink style={({isActive})=>({color:isActive?'#3b82f6':'white',background:isActive?'white':'#3b82f6'})} to={'/'}>Register</NavLink>
			}
			
			{
				log?<button id='logout' onClick={logoutHandler}>Logout</button>:<NavLink style={({isActive})=>({color:isActive?'#3b82f6':'white',background:isActive?'white':'#3b82f6'})} to={'/login'}>Login</NavLink>
			}
			
		</div>
		</div>
	)
}

export default Header

