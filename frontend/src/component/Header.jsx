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
			<img src="logo.png" alt="" id='logo'/>
		</div>
		<div className='links'>
			{
				log?<NavLink style={({isActive})=>({color:isActive?'black':'white', background:isActive?'white':'black'})} to={'/'}>Dashboard</NavLink>:<NavLink style={({isActive})=>({color:isActive?'black':'white',background:isActive?'white':'black'})} to={'/'}>Register</NavLink>
			}
			
			{
				log?<button id='logout' onClick={logoutHandler}><i className="bi bi-power"></i></button>:<NavLink style={({isActive})=>({color:isActive?'black':'white',background:isActive?'white':'black'})} to={'/login'}>Login</NavLink>
			}
			
		</div>
		</div>
	)
}

export default Header

